import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { DialogComponent } from './dialog';
import { MessageDialogComponent } from '../../admin/pages/users/message-dialog/message-dialog.component';
import { CallSummary } from '../../calling/components/call-summary/call-summary';

@Injectable()
export class DialogService {

  constructor(private modal: ModalController) {

  }

  callEndDialog(content: string) {
    return this.modal.create(CallSummary,
      {
        content: content,
      },
      {cssClass: 'call-summary-dialog'});
  }

  successDialog(content: string) {
    return this.modal.create(DialogComponent,
      {
        title: 'Success',
        content: content,
        buttons: [
          {label: 'Ok', color: 'success'}
        ]
      },
      {cssClass: 'error-dialog'});
  }

  errorDialog(content: string) {
    return this.modal.create(DialogComponent,
      {
        title: 'Error',
        content: content,
        buttons: [
          {label: 'DIALOGS.OK', color: 'link'}
        ]
      },
      {cssClass: 'error-dialog'});
  }

  confirmDialog(data) {
    return this.modal.create(DialogComponent, data, {cssClass: 'confirm-dialog'});
  }

  messageDialog(data) {
    return this.modal.create(MessageDialogComponent, data, {cssClass: 'message-dialog'});
  }
}
