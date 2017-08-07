import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../models/user';
import { NavParams, ViewController } from "ionic-angular";

@Component({
  selector: 'message-dialog',
  templateUrl: 'message-dialog.component.html'
})
export class MessageDialogComponent {

  @Input() item: User;
  @Output() itemChange = new EventEmitter<User>();
  message: string;


  constructor(public params: NavParams, public viewCtrl: ViewController) {
  }

}

