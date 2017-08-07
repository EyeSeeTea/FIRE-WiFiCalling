import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { NotificationsService } from '../services/notifications.service';
import * as Notifications from '../actions/notifications';

import { Notification } from '../models/notification';
import { DialogComponent } from '../../shared/dialog/dialog';

@Injectable()
export class NotificationsEffects {

  /** Get Notifications */

  @Effect()
  getNotifications$ = this.actions$
    .ofType(Notifications.GET_LIST, Notifications.SET_FILTER)
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
    .exhaustMap((id: number) =>
      this.notificationsService.acceptUser(id)
        .map((notifications: Notification) => new Notifications.AcceptUserSuccess())
        .catch(error => of(new Notifications.AcceptUserFailure(error)))
    );

  /** Reject User */

  @Effect()
  rejectUser$ = this.actions$
    .ofType(Notifications.REJECT_USER)
    .map((action: Notifications.RejectUser) => action.payload)
    .exhaustMap((id: number) =>
      this.notificationsService.rejectUser(id)
        .map((notifications: Notification) => new Notifications.RejectUserSuccess())
        .catch(error => of(new Notifications.RejectUserFailure(error)))
    );

  /** Mark notification as read */

  @Effect()
  markSeen$ = this.actions$
    .ofType(Notifications.MARK_SEEN)
    .map((action: Notifications.MarkSeen) => action.payload)
    .exhaustMap(({id, seen }) =>
      this.notificationsService.markSeen(id, seen)
        .map((notifications: Notification) => new Notifications.MarkSeenSuccess())
        .catch(error => of(new Notifications.MarkSeenFailure(error)))
    );

  /** Handle notifications failures */

  @Effect()
  notificationFailure$ = this.actions$
    .ofType(Notifications.ACCEPT_USER_FAILURE, Notifications.REJECT_USER_FAILURE, Notifications.MARK_SEEN_FAILURE, Notifications.GET_LIST_FAILURE)
    .map((action: Notifications.AcceptUserFailure) => action.payload)
    .map((err) => {

      this.modalCtrl.create(DialogComponent,
        {
          title: 'Error',
          content: err,
          buttons: [
            {label: 'Ok', color: 'primary'}
          ]
        }).present();
    });

  constructor(private actions$: Actions,
              private notificationsService: NotificationsService,
              private modalCtrl: ModalController) {
  }
}
