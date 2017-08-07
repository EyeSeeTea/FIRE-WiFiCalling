import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
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
        .map((users: User[]) => new Users.GetListSuccess(users))
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
            {label: 'Ok', color: 'primary'}
          ]
        }).present();
    });

  /** Send Message To Users */

  @Effect()
  sendMessage$ = this.actions$
    .ofType(Users.SEND_MESSAGE)
    .map((action: Users.SendMessage) => action.payload)
    .exhaustMap(({ message, users }) =>
      this.usersService.sendMessage(message, users)
        .map((notifications: Notification) => new Users.SendMessageSuccess())
        .catch(error => of(new Users.SendMessageFailure(error)))
    );

  @Effect({dispatch: false})
  sendMessageFailure$ = this.actions$
    .ofType(Users.SEND_MESSAGE_FAILURE)
    .map((action: Users.SendMessageFailure) => action.payload)
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
              private usersService: UsersService,
              private modalCtrl: ModalController) {
  }
}
