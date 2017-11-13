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
        {label: 'ADMIN.NOTIF.ACCEPT', value: true, color: 'success'},
        {label: 'ADMIN.NOTIF.DISMISS', color: 'light'}
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
        {label: 'ADMIN.NOTIF.REJECT', value: true, color: 'danger'},
        {label: 'ADMIN.NOTIF.DISMISS', color: 'light'}
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

