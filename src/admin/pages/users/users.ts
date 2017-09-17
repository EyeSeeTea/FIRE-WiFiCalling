import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicPage, Refresher } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { DialogService } from '../../../shared/dialog/dialog.service';
import { UserListOptions } from '../../models/user';
import { User } from '../../../auth/models/user';
import { getUsers, getUsersPending } from '../../reducers';
import * as Users from '../../actions/users';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage implements OnInit, OnDestroy {

  /** Select user list from store */
  users$ = this.store.select(getUsers);

  /** Select user list pending state from store */
  pending$ = this.store.select(getUsersPending);

  /** User list pending observer */
  pendingObs: Subscription;

  /** User list options */
  options: UserListOptions = {
    key: '',
    search: false,
    orderReverse: false,
    checkAll: false
  };

  /** Refresher ref */
  @ViewChild(Refresher) refresher: Refresher;

  constructor(public store: Store<any>, private dialogs: DialogService) {
  }

  /** Send message to selected users */
  sendMessage(selectedUsers: User[]) {

    /** Show message dialog */
    const messageDialog = this.dialogs.messageDialog({users: selectedUsers});

    messageDialog.onDidDismiss(message => {
      /** Send message to users if it exists */
      if (message) {
        this.store.dispatch(new Users.SendMessage({message: message, users: selectedUsers}));
      }
    });

    messageDialog.present();
  }

  getUserList() {
    /** Refresh user list */
    this.store.dispatch(new Users.GetList(null));
  }

  ngOnInit() {
    /** Request user list on page enter */
    this.getUserList();

    /** Complete refresher when user list is loaded */
    this.pendingObs = this.pending$.subscribe((pending) => {
      if (!pending) {
        this.refresher.complete();
      }
    });
  }

  ngOnDestroy() {
    this.pendingObs.unsubscribe();
  }

}
