import { NavController, Refresher, Tab, Tabs } from 'ionic-angular';
import { Component, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../../../reducers/notificiations-page';
import * as Notifications from '../../../actions/notifications';
import { NotifListComponent } from "../notif-list/notif-list.component";

@Component({
  selector: 'notif-wrapper',
  templateUrl: 'notif-wrapper.component.html'
})
export class NotifWrapperComponent {

  /** Notification state */
  state: State;

  @Input('state')
  set setState(state: State) {
    this.state = state;

    /** Close the refresher if pending is false */
    if (!state.pending) {
      this.refresher.complete();
    }
  }

  /** Refresher ref */
  @ViewChild(Refresher) refresher: Refresher;

  /** Notification list ref */
  @ViewChild(NotifListComponent) notifList: NotifListComponent;

  constructor(public store: Store<any>, private nav: NavController) {
  }

  ngOnInit() {
    /** When user switch notifications tab, uncheck all notification items */
    const tabs: Tabs = this.nav.parent;
    tabs.ionChange.subscribe((activeTab: Tab) => {
      if (activeTab.root === 'NotificationsPage') {
        this.notifList.check$.next('NONE');
      }
    });
  }

  /** Refresh notifications list */
  onRefresh() {
    this.store.dispatch(new Notifications.GetList(null));
  }

}

