import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'fire-dialog',
  templateUrl: 'dialog.html'
})
export class DialogComponent {

  constructor(public params: NavParams, public viewCtrl: ViewController) {
  }

}

