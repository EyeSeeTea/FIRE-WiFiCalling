import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import JsSIP from 'jssip';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import * as Outgoing from '../actions/outgoing';
import * as Session from '../actions/session';
import { SipService } from '../services/sip.service';
import { ToneService } from '../services/tone.service';
import { CallFailureResponse } from '../models/calling.models';
import audioPlayer from '../services/sounds.service';

@Injectable()
export class OutgoingEffects {

  /** Make an outgoing call */
  @Effect({dispatch: false})
  outgoingCall$ = this.actions$
    .ofType(Outgoing.CALL)
    .map((action: Outgoing.Call) => action.payload)
    .do((phoneNumber: any) => this.sip.call({phoneNumber}));

  /** Outgoing call connecting */
  @Effect({dispatch: false})
  outgoingConnecting$ = this.actions$
    .ofType(Outgoing.CONNECTING)
    .do(() => {
      // TODO: Play a tune for connecting
    });

  /** Outgoing call connecting */
  @Effect({dispatch: false})
  outgoingProgress$ = this.actions$
    .ofType(Outgoing.PROGRESS)
    .do(() => this.tone.startRinging());

  /** Outgoing call failure */
  @Effect({dispatch: false})
  outgoingFailure$ = this.actions$
    .ofType(Outgoing.FAILURE)
    .map((action: Outgoing.Failure) => action.payload)
    .do((res: CallFailureResponse) => {

      this.sip.removeSounds();
      let message: HTMLAudioElement;
      // Keep screen active while the error message is playing
      const addAudioEvent = (audio: HTMLAudioElement) => {
        const onAudioEnded = (event) => {
          this.sip.clearSessions();
          event.target.removeEventListener('ended', onAudioEnded, false);
          message = null;
        };
        audio.addEventListener('ended', onAudioEnded);
      };

      switch (res.cause) {
        case JsSIP.C.causes.NOT_FOUND:
          message = audioPlayer.play('error_404');
          addAudioEvent(message);
          break;
        case JsSIP.C.causes.CANCELED:
          message = audioPlayer.play('rejected');
          addAudioEvent(message);
          break;
        case JsSIP.C.causes.BUSY:
          this.tone.startBusyTone();
          setTimeout(() => {
            this.sip.removeSounds();
            this.sip.clearSessions();
          }, 5000);
          break;
        default:
          message = audioPlayer.play('error_general');
          addAudioEvent(message);
      }

    });

  /** Outgoing call accepted */
  @Effect({dispatch: false})
  outgoingAccepted$ = this.actions$
    .ofType(Outgoing.ACCEPTED)
    .do(() => {
      this.tone.stopRinging();
      audioPlayer.play('answered');
    });

  /** Outgoing call ended */
  @Effect()
  outgoingEnded$ = this.actions$
    .ofType(Outgoing.ENDED)
    .map((action: Outgoing.Ended) => action.payload)
    .exhaustMap((data) => {
      audioPlayer.play('hangup');
      this.sip.removeSounds();
      this.sip.clearSessions();
      return of(new Session.Disconnected(null));
    });

  constructor(private actions$: Actions,
              private sip: SipService,
              private tone: ToneService) {
  }

}
