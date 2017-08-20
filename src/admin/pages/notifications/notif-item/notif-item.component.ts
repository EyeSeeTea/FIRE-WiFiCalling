import { Component, Input } from '@angular/core';
import { Notification } from '../../../models/notification';
import { Store } from "@ngrx/store";
import * as notifications from '../../../actions/notifications';

@Component({
  selector: 'notif-item',
  templateUrl: 'notif-item.component.html'
})
export class NotifItemComponent {

  temp;
  item: Notification;
  @Input() checked = false;

  /** Workaround until the server returns a fixed properties */
  @Input('item')
  set setItem(item) {
    this.item = item;
    this.temp = item.newUserAccepted || item.newUserRequest || item.message || item.voucher || item;
  }

  constructor(private store: Store<any>) {
  }

  /** Accept user */
  acceptUser() {
    this.store.dispatch(new notifications.AcceptUser(this.item.id));
  }

  /** Reject user */
  rejectUser() {
    this.store.dispatch(new notifications.RejectUser(this.item.id));
  }
}

