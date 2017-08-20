import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { LoadingController, ModalController } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { UsersService } from '../services/users.service';
import * as Users from '../actions/users';

import { User } from '../models/user';
import { DialogComponent } from '../../shared/dialog/dialog';

@Injectable()
export class UsersEffects {

  /** Get Users */

  @Effect()
  getUsers$ = this.actions$
    .ofType(Users.GET_LIST)
    .map((action: Users.GetList) => action.payload)
    .exhaustMap(() =>
      this.usersService.getUsers()
        .map((users: User[]) => {
          /** Transform User to UserItem for users view */
          const userItems = [];
          users.map((user: User) => {
            userItems.push({...user, checked: false});
          });
          return new Users.GetListSuccess(userItems)
        })
        .catch(error => of(new Users.GetListFailure(error)))
    );

  /** Get Users Fail */

  @Effect({dispatch: false})
  getUsersFailure$ = this.actions$
    .ofType(Users.GET_LIST_FAILURE)
    .map((action: Users.GetListFailure) => action.payload)
    .map((err) => {

      this.modalCtrl.create(DialogComponent,
        {
          title: 'Error',
          content: err,
          buttons: [
            {label: 'Ok', color: 'link'}
          ]
        }).present();
    });

  /** Send Message To Selected Users */

  @Effect()
  sendMessage$ = this.actions$
    .ofType(Users.SEND_MESSAGE)
    .map((action: Users.SendMessage) => action.payload)
    .exhaustMap(({message, users}) => {

      /** Show loading dialog */
      this.loadingDialog = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loadingDialog.present();

      return this.usersService.sendMessage(message, users)
        .map((notifications: Notification) => new Users.SendMessageSuccess(users.length))
        .catch(error => of(new Users.SendMessageFailure(error)))
    });

  /** Send Message Success */

  @Effect({dispatch: false})
  sendMessageSuccess$ = this.actions$
    .ofType(Users.SEND_MESSAGE_SUCCESS)
    .map((action: Users.SendMessageSuccess) => action.payload)
    .map((usersCount: number) => {

      /** Close loading dialog */
      this.loadingDialog.dismiss();

      /** Show success dialog */
      this.modalCtrl.create(DialogComponent,
        {
          title: 'Success',
          content: `Message was sent to ${usersCount} users!`,
          buttons: [
            {label: 'Ok', color: 'success'}
          ]
        }).present();
    });

  /** Send Message Failure */

  @Effect({dispatch: false})
  sendMessageFailure$ = this.actions$
    .ofType(Users.SEND_MESSAGE_FAILURE)
    .map((action: Users.SendMessageFailure) => action.payload)
    .map((err) => {

      /** Close loading dialog */
      this.loadingDialog.dismiss();

      /** Show error dialog */
      this.modalCtrl.create(DialogComponent,
        {
          title: 'Error',
          content: err,
          buttons: [
            {label: 'Ok', color: 'link'}
          ]
        }).present();
    });

  /** Loading dialog ref */
  loadingDialog;

  constructor(private actions$: Actions,
              private usersService: UsersService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController) {
  }
}
