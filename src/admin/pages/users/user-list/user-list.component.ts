import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { User } from '../../../models/user';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { UserItemComponent } from "../user-item/user-item.component";
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";
import { ModalController } from "ionic-angular";

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.component.html'
})
export class UserListComponent {

  @Input() users: User[];
  search = false;

  /** Filter contacts with name or phone number */
  filterKey = new BehaviorSubject('');

  /** Users list */
  list = new Subject<any>();

  nameUp = false;

  @ViewChildren(UserItemComponent) userItems: QueryList<UserItemComponent>;

  constructor(private modalCtrl: ModalController) {

  }

  ngOnDestroy() {
    this.filterKey.unsubscribe();
  }

  checkAll(e) {
    this.userItems.map((item: UserItemComponent) => {
      item.checked = e.value;
      return item;
    });
  }

  check() {
    return this.userItems && this.userItems.filter((user: UserItemComponent) => user.checked).length;
  }
  sendMessage() {

    this.modalCtrl.create(MessageDialogComponent,
      {
        usersNumber: this.userItems.filter((user: UserItemComponent) => user.checked).length
      }).present();
  }

}

