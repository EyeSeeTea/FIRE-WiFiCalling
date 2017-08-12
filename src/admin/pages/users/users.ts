import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicPage, ModalController, Refresher } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as users from '../../actions/users';
import * as fromAdmin from '../../reducers';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { User, UserListOptions } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage implements OnInit, OnDestroy {

  /** Select user list from store */
  users$ = this.store.select(fromAdmin.getUsers);

  /** Select user list pending state from store */
  pending$ = this.store.select(fromAdmin.getUsersPending);

  /** User list pending observer */
  pendingObs: Subscription;

  /** User list options */
  options: UserListOptions = {
    key: '',
    search: true,
    orderReverse: false,
    checkAll: false
  };

  /** Refresher ref */
  @ViewChild(Refresher) refresher: Refresher;

  constructor(public store: Store<any>, private modalCtrl: ModalController,) {
  }

  /** Send message to selected users */
  sendMessage(selectedUsers: User[]) {

    /** Show message dialog */
    const messageDialog = this.modalCtrl.create(MessageDialogComponent,
      {
        usersCount: selectedUsers.length
      });

    messageDialog.onDidDismiss(message => {
      /** Send message confirmed */
      this.store.dispatch(new users.SendMessage({message: message, users: selectedUsers}));
    });
    messageDialog.present();
  }

  ionViewWillEnter() {
    /** Request users' list from the store */
    this.store.dispatch(new users.GetList(null));
  }

  ngOnInit() {
    /** Complete refresher when user list is loaded */
    this.pendingObs = this.pending$.subscribe((pending) => {
      if (!pending) {
        this.refresher.complete();
      }
    });
  }

  refreshUserList() {
    this.store.dispatch(new users.GetList(null));
  }

  ngOnDestroy() {
    this.pendingObs.unsubscribe();
  }

}
