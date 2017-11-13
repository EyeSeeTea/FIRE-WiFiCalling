import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'mark-popup',
  template: `
    <button ion-button clear full class="item" (click)="viewCtrl.dismiss('ALL')">
      {{ 'ADMIN.NOTIF.SELECT_ALL' | translate }}
    </button>
    <button ion-button clear full class="item" (click)="viewCtrl.dismiss('UNSEEN')">
      {{ 'ADMIN.NOTIF.SELECT_UNSEEN' | translate }} ({{ params.get('unseen') }})
    </button>
    <button ion-button clear full class="item" (click)="viewCtrl.dismiss('NONE')">
      {{ 'ADMIN.NOTIF.DESELECT_ALL' | translate }}
    </button>
  `
})
export class MarkPopupComponent {

  constructor(public params: NavParams, public viewCtrl: ViewController) {
  }

}

