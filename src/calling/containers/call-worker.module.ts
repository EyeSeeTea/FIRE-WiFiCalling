import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SipEffects } from '../effects/sip.effects';
import { SessionEffects } from '../effects/session.effects';
import { IncomingEffects } from '../effects/incoming.effects';
import { OutgoingEffects } from '../effects/outgoing.effects';
import { reducers } from '../reducers';

import { SipService } from '../services/sip.service';
import { CallWorker } from './call-worker';
import { SharedModule } from '../../shared/shared.module';
import { SessionCall } from '../components/session-call/session-call';
import { IncomingCall } from '../components/incoming-call/incoming-call';
import { OutgoingCall } from '../components/outgoing-call/outgoing-call';
import { SipStatus } from '../components/sip-status/sip-status';
import { ToneService } from '../services/tone.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
    StoreModule.forFeature('calling', reducers),
    EffectsModule.forFeature([SipEffects, SessionEffects, OutgoingEffects, IncomingEffects]),
    SharedModule
  ],
  declarations: [
    CallWorker,
    SessionCall,
    IncomingCall,
    OutgoingCall,
    SipStatus
  ],
  exports: [
    CallWorker
  ],
  providers: [
    SipService,
    ToneService,
  ]
})
export class CallWorkerModule {
}
