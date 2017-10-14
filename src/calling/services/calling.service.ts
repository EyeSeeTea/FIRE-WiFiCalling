import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import JsSIP from 'jssip';
import { ToneService } from "../../tone/tone.service";
import { Store } from "@ngrx/store";
import { User } from "../../auth/models/user";

@Injectable()
export class CallingService {

  private audioElement: HTMLAudioElement;
  private ua;
  socket;
  settings;

  constructor(private toneService: ToneService, private store: Store<any>) {
  }

  initialize(user: User) {

    this.settings = {
      display_name: user.name,
      uri: '1@dev.eyeseetea.com',
      password: '1pass',
      socket: {
        uri: 'wss://dev.eyeseetea.com:8443' || user.sip.host,
        via_transport: 'auto',
      },
      registrar_server: null,
      contact_uri: null,
      authorization_user: '1',
      instance_id: null,
      session_timers: true,
      use_preloaded_route: false
    };

    this.socket = new JsSIP.WebSocketInterface(this.settings.socket.uri);
    this.socket.via_transport = 'auto';

    // Setup JsSIP
    try {
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

    } catch (error) {
      console.log('JsSIP config error', error);
      return;
    }

  }

  addEvents(sipUa) {
    sipUa.on('connecting', () =>
      console.log('connecting')
    );

    sipUa.on('connected', () => {
      console.log('connected');
      sipUa.register();
    });

    sipUa.on('disconnected', () =>
      console.log('disconnected')
    );

    sipUa.on('registered', () =>
      console.log('registered')
    );

    sipUa.on('unregistered', () => {
      console.log('unregistered');
    });

    sipUa.on('registrationFailed', (data) => {
      console.log('registrationFailed');
    });

    sipUa.on('newRTCSession', (data) => {
      if (data.originator === 'local') {
        return;
      } // Catch incoming actions only
      this.handleIncomingCall(data);
    });
  }

  handleIncomingCall(data) {
    data.session.on('failed', (err) => {
      console.log('failed');
    });

    data.session.on('ended', () => {
      console.log('ended');
    });

    data.session.on('accepted', () => {
      console.log('accepted');
    });
  }

  /** Fake peer answer in 2s delay */
  call(user) {
    return of({}).delay(2000);

    // const uri = 'sip:2@dev.eyeseetea.com';
    // const session = this.ua.call(uri, options);
  }
}
