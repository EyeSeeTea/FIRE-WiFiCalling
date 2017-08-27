import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'menu-dialog',
  templateUrl: 'menu-dialog.component.html'
})
export class MenuDialogComponent {

  constructor(public params: NavParams, public viewCtrl: ViewController) {
  }

}
