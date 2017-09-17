import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'mark-popup',
  template: `
    <button ion-button clear full class="item" (click)="viewCtrl.dismiss('ALL')">
      Select All
    </button>
    <button ion-button clear full class="item" (click)="viewCtrl.dismiss('UNSEEN')">
      Unread ({{ params.get('unseen') }})
    </button>
    <button ion-button clear full class="item" (click)="viewCtrl.dismiss('NONE')">
      Unselect All
    </button>
  `
})
export class MarkPopupComponent {

  constructor(public params: NavParams, public viewCtrl: ViewController) {
  }

}

