import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { User } from '../../../models/user';

@Component({
  selector: 'message-dialog',
  templateUrl: 'message-dialog.component.html'
})
export class MessageDialogComponent implements OnInit {

  message: string;
  users: User[];

  constructor(public params: NavParams, public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.users = this.params.get('users');
  }

}

