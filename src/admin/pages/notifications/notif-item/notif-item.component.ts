import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService } from '../../../../shared/dialog/dialog.service';
import { Notification } from '../../../models/notification';
import * as Notifications from '../../../actions/notifications';

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

  constructor(private store: Store<any>, private dialogs: DialogService) {
  }

  /** Accept user */
  acceptUser() {

    const acceptDialog = this.dialogs.confirmDialog({
      title: 'Confirmation!',
      content: 'Accept registration request from ' + this.temp.user.name,
      buttons: [
        {label: 'Accept Registration', value: true, color: 'secondary'},
        {label: 'Dismiss', color: 'light'}
      ]
    });

    acceptDialog.onDidDismiss(confirmed => {
      if (confirmed) {
        this.store.dispatch(new Notifications.AcceptUser(this.item.id));
      }
    });

    acceptDialog.present();
  }

  /** Reject user */
  rejectUser() {

    const rejectDialog = this.dialogs.confirmDialog({
      title: 'Confirmation!',
      content: 'Reject registration request from ' + this.temp.user.name,
      buttons: [
        {label: 'Reject Registration', value: true, color: 'danger'},
        {label: 'Dismiss', color: 'light'}
      ]
    });

    rejectDialog.onDidDismiss(confirmed => {
      if (confirmed) {
        this.store.dispatch(new Notifications.RejectUser(this.item.id));
      }
    });

    rejectDialog.present();
  }
}

