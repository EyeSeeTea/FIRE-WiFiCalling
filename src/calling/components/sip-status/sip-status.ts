import { Component, Input } from '@angular/core';

import { State } from '../../reducers/sip';

@Component({
  selector: 'sip-status',
  template: `
    <div class="sip-status" *ngIf="state?.status !== 'connected'">
      {{ state?.status }}
    </div>
  `
})

export class SipStatus {

  @Input() state: State;
}
