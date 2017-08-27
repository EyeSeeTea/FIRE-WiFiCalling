import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AcceptUser, RejectUser } from '../../../actions/notifications';
import { DialogComponent } from '../../../../shared/dialog/dialog';
import { Notification } from '../../../models/notification';

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

  constructor(private store: Store<any>, private modalCtrl: ModalController) {
  }

  /** Accept user */
  acceptUser() {
    const fireDialogOptions = {
      title: 'Confirmation!',
      content: 'Accept registration request from ' + this.temp.user.name,
      buttons: [
        {label: 'Accept Registration', value: true, color: 'secondary'},
        {label: 'Dismiss', color: 'light'}
      ]
    };

    const acceptDialog = this.modalCtrl.create(DialogComponent, fireDialogOptions);

    acceptDialog.onDidDismiss(confirmed => {
      if (confirmed) {
        this.store.dispatch(new AcceptUser(this.item.id));
      }
    });

    acceptDialog.present();
  }

  /** Reject user */
  rejectUser() {

    const fireDialogOptions = {
      title: 'Confirmation!',
      content: 'Reject registration request from ' + this.temp.user.name,
      buttons: [
        {label: 'Reject Registration', value: true, color: 'danger'},
        {label: 'Dismiss', color: 'light' }
      ]
    };

    const rejectDialog = this.modalCtrl.create(DialogComponent, fireDialogOptions);

    rejectDialog.onDidDismiss(confirmed => {
      if (confirmed) {
        this.store.dispatch(new RejectUser(this.item.id));
      }
    });

    rejectDialog.present();
  }
}

