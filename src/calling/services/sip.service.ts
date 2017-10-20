import { Injectable } from '@angular/core';
import 'rxjs/add/operator/delay';

import JsSIP from 'jssip';
import { ToneService } from './tone.service';
import { Store } from '@ngrx/store';
import { User } from '../../auth/models/user';
import * as Sip from '../actions/sip';
import * as Session from '../actions/session';
import * as Incoming from '../actions/incoming';
import * as Outgoing from '../actions/outgoing';
import audioPlayer from './sounds.service';
import callOptions from './sip.config';
import { CallSettings } from '../models/calling.models';

@Injectable()
export class SipService {

  private audioElement: HTMLAudioElement;
  ua;
  socket;
  sipHost: string;
  settings: CallSettings;

  state = {
    session: null,
    incomingSession: null
  };

  constructor(private toneService: ToneService, private store: Store<any>) {
  }

  initialize(user: User) {
    /** Set sip host e.g. 'dev.eyeseetea.com' */
    this.sipHost = user.sip.host;

    try {

      this.socket = new JsSIP.WebSocketInterface(`wss://${this.sipHost}:8443`);

      this.settings = {
        uri: `${user.id}@${user.sip.host}`,
        sockets: [this.socket],
        display_name: user.name,
        password: user.password
      };

      // JsSIP.debug.enable('JsSIP:*');
      this.ua = new JsSIP.UA(this.settings);

      this.addEvents(this.ua);

      // Start JsSIP
      this.ua.start();
    } catch (err) {
      this.store.dispatch(new Sip.Disconnected(err));
    }
  }

  addEvents(sipUa) {
    /** SIP Connecting  */
    sipUa.on('connecting', () => this.store.dispatch(new Sip.Connecting()));

    /** SIP Disconnect */
    sipUa.on('disconnected', (x) => this.store.dispatch(new Sip.Disconnected(x)));

    /** SIP Connected */
    sipUa.on('connected', () => this.store.dispatch(new Sip.Connected(null)));

    /** SIP Registered (Online) */
    sipUa.on('registered', () => this.store.dispatch(new Sip.Registered()));

    /** SIP Unregistered (Offline) */
    sipUa.on('unregistered', () => this.store.dispatch(new Sip.Disconnected(null)));

    /** SIP Registration Failed */
    sipUa.on('registrationFailed', (error) => this.store.dispatch(new Sip.Disconnected(error)));

    /** SIP incoming calls */
    sipUa.on('newRTCSession', (data) => {

      console.log('XXX newRTCSession', data);

      if (data.originator === 'local') {

        /** Outgoing calls */

        data.session.on('connecting', () => this.store.dispatch(new Outgoing.Connecting()));

        data.session.on('progress', () => this.store.dispatch(new Outgoing.Progress()));

        data.session.on('confirmed', () => this.store.dispatch(new Session.Connected({type: 'outgoing', connection: 'internet', peer: null})));

        data.session.on('failed', (e) => this.store.dispatch(new Outgoing.Failure(e)));

        data.session.on('ended', (e) => this.store.dispatch(new Outgoing.Ended(e)));

        data.session.connection.onaddstream = (e) => this.addStream(e);

        data.session.connection.onremovestream = (e) => this.removeSounds();

        data.session.on('accepted', () => this.store.dispatch(new Outgoing.Accepted()));

      } else {

        /** Incoming calls */

        data.session.on('failed', (e) => {
          this.store.dispatch(new Incoming.Failure(e));
          this.clearSessions();
          this.removeSounds();
        });

        data.session.on('ended', (e) => {
          this.store.dispatch(new Session.CallEnded(e));
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

        /** Create user instance to display caller id */
        const user: User = {name: data.session.remote_identity.display_name};
        this.store.dispatch(new Incoming.Handle(user));
        this.setState({incomingSession: data});
      }
    });
  }

  /** Accept incoming call */
  answerIncomingCall() {
    this.state.incomingSession.session.answer(callOptions);
    this.state.incomingSession.session.connection.onaddstream = this.addStream;
    this.state.incomingSession.session.connection.onremovestream = this.removeSounds;
  }

  /** Reject incoming call */
  hangUpIncomingCall() {
    this.state.incomingSession.session.terminate({status_code: 487});
    this.clearSessions();
  }

  call(user: User) {

    const uri = `sip:${user.phoneNumber}@${this.sipHost}`;

    // Start session
    this.state.session = this.ua.call(uri, callOptions);
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
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
