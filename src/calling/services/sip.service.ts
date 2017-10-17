import { Injectable } from '@angular/core';
import 'rxjs/add/operator/delay';

import JsSIP from 'jssip';
import { ToneService } from './tone.service';
import { Store } from '@ngrx/store';
import { User } from '../../auth/models/user';
import * as Sip from '../actions/sip';
import * as Session from '../actions/session';
import * as Incoming from '../actions/incoming';
import audioPlayer from './sounds.service';

@Injectable()
export class SipService {

  private audioElement: HTMLAudioElement;
  ua;
  socket;
  settings;

  state = {
    session: null,
    incomingSession: null
  };

  constructor(private toneService: ToneService, private store: Store<any>) {
  }

  initialize(user: User) {

    // Setup JsSIP
    try {
      this.settings = {
        display_name: user.name,
        uri: `${user.id}@${user.sip.host}`,
        password: user.password,
        socket: {
          uri: `wss://${user.sip.host}:8443`,
          via_transport: 'auto',
        },
        registrar_server: null,
        contact_uri: null,
        authorization_user: user.id,
        instance_id: null,
        session_timers: true,
        use_preloaded_route: false,
        domain: user.sip.host
      };

      this.socket = new JsSIP.WebSocketInterface(this.settings.socket.uri);
      this.socket.via_transport = 'auto';

      JsSIP.debug.enable('JsSIP:*');
      this.ua = new JsSIP.UA({
        uri: this.settings.uri,
        password: this.settings.password,
        display_name: this.settings.display_name,
        sockets: [this.socket],
        registrar_server: this.settings.registrar_server,
        contact_uri: this.settings.contact_uri,
        authorization_user: this.settings.authorization_user,
        instance_id: this.settings.instance_id,
        session_timers: this.settings.session_timers,
        use_preloaded_route: this.settings.use_preloaded_route
      });

      this.addEvents(this.ua);

      // Start JsSIP
      this.ua.start();
    } catch (err) {
      this.store.dispatch(new Sip.Disconnected(err));
    }
  }

  addEvents(sipUa) {
    /** SIP Connecting  */
    sipUa.on('connecting', (x) => this.store.dispatch(new Sip.Connecting()));

    /** SIP Disconnect */
    sipUa.on('disconnected', (x) => this.store.dispatch(new Sip.Disconnected(x)));

    /** SIP Connected */
    sipUa.on('connected', () => {
      this.store.dispatch(new Sip.Connected());
      sipUa.register();
    });

    /** SIP Registered (Online) */
    sipUa.on('registered', () => this.store.dispatch(new Sip.Registered()));

    /** SIP Unregistered (Offline) */
    sipUa.on('unregistered', () => {
      this.store.dispatch(new Sip.Disconnected(null));
    });

    /** SIP Error (Online) */
    sipUa.on('registrationFailed', (error) => {
      this.store.dispatch(new Sip.Disconnected(error));
    });

    /** SIP incoming calls */
    sipUa.on('newRTCSession', (data) => {

      if (data.originator === 'local') {
        return;
      }

      data.session.on('failed', (e) => {
        this.store.dispatch(new Incoming.CallFailure(e));
        this.clearSessions();
        this.removeSounds();
      });

      data.session.on('ended', () => {
        this.store.dispatch(new Session.CallEnded());
        this.clearSessions();
        this.removeSounds();
      });

      data.session.on('accepted', () => {
        audioPlayer.stop('ringing');
        this.setState({
          session: data.session,
          incomingSession: null
        });
        this.store.dispatch(new Session.Connected({type: 'incoming', connection: 'internet', peer: null}));
      });

      this.store.dispatch(new Incoming.HandleIncomingCalls(data));
      this.setState({incomingSession: data});
    });
  }

  /** Accept incoming call */
  answerIncomingCall() {
    this.state.incomingSession.session.answer({
      mediaConstraints: {
        audio: true,
        video: false
      },
      rtcOfferConstraints: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: false
      }
    });
    this.state.incomingSession.session.connection.onaddstream = this.addStream;
    this.state.incomingSession.session.connection.onremovestream = this.removeSounds;
  }

  /** Reject incoming call */
  hangUpIncomingCall() {
    this.state.incomingSession.session.terminate({status_code: 487});
    this.clearSessions();
  }

  handleHangup() {
    try {
      this.state.session.terminate();
    } catch (error) {
      console.log('Session already finished');
    }
    this.removeSounds();
    this.clearSessions();
    this.store.dispatch(new Session.Disconnected(null));
  }

  call(user: User) {

    const uri = `sip:${user.phoneNumber}@${this.settings.domain}`;

    console.log('calling', uri);

    // Start session
    this.state.session = this.ua.call(uri, {
      pcConfig: {
        rtcpMuxPolicy: 'negotiate',
        iceServers: []
      },
      mediaConstraints: {
        audio: true,
        video: false
      },
      rtcOfferConstraints: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: false
      },
      sessionTimersExpires: 120
    });

    this.state.session.on('connecting', () => {
      this.toneService.startRinging();
    });

    this.state.session.on('failed', (data) => {
      this.removeSounds();
      let message: HTMLAudioElement;

      // Keep screen active while the error message is playing
      const addAudioEvent = (audio: HTMLAudioElement) => {
        const onAudioEnded = (event) => {

          /** Clear session */
          this.store.dispatch(new Session.Disconnected(data));

          event.target.removeEventListener('ended', onAudioEnded, false);
          message = null;
        };
        audio.addEventListener('ended', onAudioEnded);
      };

      switch (data.cause) {
        case JsSIP.C.causes.NOT_FOUND:
          message = audioPlayer.play('error_404');
          addAudioEvent(message);
          break;
        case JsSIP.C.causes.CANCELED:
          message = audioPlayer.play('rejected');
          addAudioEvent(message);
          break;
        case JsSIP.C.causes.BUSY:
          this.toneService.startBusyTone();
          setTimeout(() => {
            this.removeSounds();

            /** Clear session */
            this.store.dispatch(new Session.Disconnected(data));
          }, 5000);
          break;
        default:
          message = audioPlayer.play('error_general');
          addAudioEvent(message);
      }

    });

    this.state.session.on('ended', () => {
      this.removeSounds();
      /** Clear session */
      this.store.dispatch(new Session.Disconnected(event));
      audioPlayer.play('hangup');
    });

    this.state.session.connection.onaddstream = (e) => {
      this.addStream(e);
    };

    this.state.session.connection.onremovestream = (e) => {
      this.removeSounds();
    };

    this.state.session.on('accepted', () => {
      this.toneService.stopRinging();
      audioPlayer.play('answered');
    });
  }

  setState(newState) {
    this.state = Object.assign({}, this.state, newState);
    return;
  }

  /** Set all sessions state to null */
  clearSessions() {
    this.setState({
      session: null,
      incomingSession: null
    });
  }

  /**
   * Play audio stream
   * @param e Stream event
   */
  addStream(e) {
    console.log('STREAM', e);
    this.audioElement = document.body.appendChild(document.createElement('audio'));
    this.audioElement.srcObject = e.stream;
    this.audioElement.play();
  }

  /**
   * Stop all sounds and remove audio elements
   */
  removeSounds() {
    // If is ringing
    this.toneService.stopAll();

    // If is playing a message
    audioPlayer.stopAll();

    // If an audio element exist
    if (this.audioElement) {
      document.body.removeChild(this.audioElement);
      this.audioElement = null;
    }
  }
}
