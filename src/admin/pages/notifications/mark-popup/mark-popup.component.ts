import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";

@Component({
  selector: 'mark-popup',
  template: `
    <button ion-button clear full class="item" (click)="selectAll()">
      Select All
    </button>
    <button ion-button clear full class="item" (click)="selectUnread()">
      Unread ({{ params.get('unread') }})
    </button>
  `
})
export class MarkPopupComponent {

  constructor(public params: NavParams, public viewCtrl: ViewController) {
  }

  selectAll() {
    this.viewCtrl.dismiss('SELLECT_ALL');
  }

  selectUnread(){
    this.viewCtrl.dismiss('SELLECT_UNREAD');
  }

}

