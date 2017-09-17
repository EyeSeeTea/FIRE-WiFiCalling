import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { Notification } from '../models/notification';
import { NotificationsService } from '../services/notifications.service';
import * as Notifications from '../actions/notifications';
import { DialogService } from '../../shared/dialog/dialog.service';

@Injectable()
export class NotificationsEffects {

  /** Get Notifications when GET_LIST, SET_FILTER, SET_ORDER is used */

  @Effect()
  getNotifications$ = this.actions$
    .ofType(Notifications.GET_LIST, Notifications.SET_FILTER, Notifications.SET_ORDER)
    .map((action: Notifications.GetList) => action.payload)
    .exhaustMap((filter) =>

      this.notificationsService.getNotifications(filter)
        .map((notifications: Notification[]) => new Notifications.GetListSuccess(notifications))
        .catch(error => of(new Notifications.GetListFailure(error)))
    );

  /** Accept User */

  @Effect()
  acceptUser$ = this.actions$
    .ofType(Notifications.ACCEPT_USER)
    .map((action: Notifications.AcceptUser) => action.payload)
    .exhaustMap((id: number) => {

      /** Show loading dialog */
      this.loadingDialog = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loadingDialog.present();

      return this.notificationsService.acceptUser(id)
        .map((notifications: Notification) => new Notifications.AcceptUserSuccess())
        .catch(error => of(new Notifications.AcceptUserFailure(error)));
    });

  @Effect({dispatch: false})
  acceptUserSuccess$ = this.actions$
    .ofType(Notifications.ACCEPT_USER_SUCCESS)
    .map(() => {

      /** Close loading dialog */
      if (this.loadingDialog) {
        this.loadingDialog.dismiss();
      }

      /** Show success dialog */
      this.dialogs.successDialog('Registration accepted.').present();
    });

  /** Reject User */

  @Effect()
  rejectUser$ = this.actions$
    .ofType(Notifications.REJECT_USER)
    .map((action: Notifications.RejectUser) => action.payload)
    .exhaustMap((id: number) => {

      /** Show loading dialog */
      this.loadingDialog = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loadingDialog.present();

      return this.notificationsService.rejectUser(id)
        .map((notifications: Notification) => new Notifications.RejectUserSuccess())
        .catch(error => of(new Notifications.RejectUserFailure(error)));
    });

  @Effect({dispatch: false})
  rejectUserSuccess$ = this.actions$
    .ofType(Notifications.REJECT_USER_SUCCESS)
    .map(() => {
      /** Close loading dialog */
      this.loadingDialog.dismiss();

      /** Show success dialog */
      this.dialogs.successDialog('Registration rejected!').present();
    });

  /** Mark notification as seen */

  @Effect()
  markSeen$ = this.actions$
    .ofType(Notifications.MARK_SEEN)
    .map((action: Notifications.MarkSeen) => action.payload)
    .exhaustMap((selectedItems: Notification[]) => {

      /** Extract the ids from the selected notifications */
      const selectedIds = selectedItems.map(item => item.id);

      return this.notificationsService.markSeen(selectedIds, true)
        .map((notifications: Notification) => new Notifications.MarkSeenSuccess())
        .catch(error => of(new Notifications.MarkSeenFailure(error)))
    });

  /** Handle notifications failures */

  @Effect({dispatch: false})
  notificationFailure$ = this.actions$
    .ofType(Notifications.ACCEPT_USER_FAILURE, Notifications.REJECT_USER_FAILURE, Notifications.MARK_SEEN_FAILURE, Notifications.GET_LIST_FAILURE)
    .map((action: Notifications.AcceptUserFailure) => action.payload)
    .map((err) => {

      /** Close loading dialog */
      if (this.loadingDialog) {
        this.loadingDialog.dismiss();
      }

      /** Show error dialog */
      this.dialogs.errorDialog(err).present();
    });

  /** Loading dialog ref */
  loadingDialog: Loading;

  constructor(private actions$: Actions,
              private notificationsService: NotificationsService,
              private loadingCtrl: LoadingController,
              private dialogs: DialogService) {
  }
}
