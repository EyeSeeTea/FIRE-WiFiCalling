import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import JsSIP from 'jssip';

@Injectable()
export class CallingService {

  public socket: any;
  configuration;
  // ua;

  constructor() {

    this.socket = new JsSIP.WebSocketInterface('ws://dev.eyeseetea.com');
    this.configuration = {
      sockets: [this.socket],
      uri: '1@dev.eyeseetea.com',
      password: '1pass',
      display_name: '1@dev.est',
      authorization_user: '1',
      registrar_server: 'dev.eyeseetea.com'
    };
  }

  // connect() {
  //   JsSIP.debug.enable('JsSIP:*');
  //
  //   this.ua = new JsSIP.UA(this.configuration);
  //   this.ua.start();
  //
  //   // Register callbacks to desired call events
  //   const eventHandlers = {
  //     'progress': function (e) {
  //       console.log('call is in progress');
  //     },
  //     'failed': function (e) {
  //       console.log('call failed with cause: ' + e.data.cause);
  //     },
  //     'ended': function (e) {
  //       console.log('call ended with cause: ' + e.data.cause);
  //     },
  //     'confirmed': function (e) {
  //       console.log('call confirmed');
  //     }
  //   };

    // const options = {
    //   'eventHandlers': eventHandlers,
    //   'mediaConstraints': {'audio': true}
    // };

    // const uri = 'sip:2@dev.eyeseetea.com';
    // const session = this.ua.call(uri, options);
  // }


  /** Fake user answering in 2s */
  call(user) {
    return of({}).delay(2000);
  }
}
