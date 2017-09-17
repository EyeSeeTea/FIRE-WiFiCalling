import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';

import { UsersService } from '../services/users.service';
import * as Users from '../actions/users';

import { User } from '../../auth/models/user';
import { DialogService } from '../../shared/dialog/dialog.service';

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
      if(this.loadingDialog){
        this.loadingDialog.dismiss();
      }

      /** Show success dialog */
      this.dialogs.successDialog(`Message was sent to ${usersCount} users!`).present();
    });

  /** Handle users failures */

  @Effect({dispatch: false})
  usersFailure$ = this.actions$
    .ofType(Users.SEND_MESSAGE_FAILURE, Users.GET_LIST_FAILURE)
    .map((action: Users.SendMessageFailure) => action.payload)
    .map((err) => {

      /** Close loading dialog */
      if(this.loadingDialog){
        this.loadingDialog.dismiss();
      }

      /** Show error dialog */
      this.dialogs.errorDialog(err).present();
    });

  /** Loading dialog ref */
  loadingDialog: Loading;

  constructor(private actions$: Actions,
              private usersService: UsersService,
              private loadingCtrl: LoadingController,
              private dialogs: DialogService) {
  }
}
