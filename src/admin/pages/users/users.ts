import { Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import * as users from '../../actions/users';
import * as fromAdmin from '../../reducers';
import { UserItemComponent } from "./user-item/user-item.component";

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage implements OnDestroy {

  users$ = this.store.select(fromAdmin.getUsers);

  search;

  constructor(public store: Store<any>) {

  }

  ngOnInit() {

    // this.filterKey.subscribe((key: string) => {
    //   this.list.next(mockList);
    // });
    // this.list.next(mockList);
  }


  ionViewWillEnter() {
    this.store.dispatch(new users.GetList(null));
  }

  ionViewWillLeave() {
    // this.search = false;
  }

  ngOnDestroy(){

  }

}
