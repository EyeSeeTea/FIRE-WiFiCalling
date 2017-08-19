import { IonicPage, Refresher } from 'ionic-angular';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromAdmin from '../../reducers';
import * as notifications from '../../actions/notifications';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage implements OnInit, OnDestroy {

  /** Select notification list from store */
  notifications$ = this.store.select(fromAdmin.getNotifications);

  /** Select notification filter from store */
  filter$ = this.store.select(fromAdmin.getNotifFilter);

  /** Select notification order from store */
  order$ = this.store.select(fromAdmin.getNotifOrder);

  /** Select showFilterMenu from store */
  showFilterMenu$ = this.store.select(fromAdmin.getNotifShowFilterMenu);

  /** Select notification list pending state from store */
  pending$ = this.store.select(fromAdmin.getNotifPending);

  /** Notification list pending observer */
  pendingObs: Subscription;

  /** A variable to check multiple notifications
   * It is one of the following 'All', 'Unseen', 'None' */
  selectNotif: string;

  /** Refresher ref */
  @ViewChild(Refresher) refresher: Refresher;

  constructor(public store: Store<any>) {

  }

  getNotificationsList() {
    this.store.dispatch(new notifications.GetList(null));
  }

  ionViewWillEnter() {
    /** Request notification list on page enter */
    this.getNotificationsList();
  }

  ngOnInit() {
    /** Complete refresher when notification list is loaded */
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

