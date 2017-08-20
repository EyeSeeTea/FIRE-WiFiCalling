/** Notification filter:
 * Select (all/unread/none) notifications
 * Set notification date order
 * Set filter menu
 * */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopoverController, Select } from 'ionic-angular';
import * as notifications from '../../../actions/notifications';
import * as fromAdmin from '../../../reducers';
import { Notification } from '../../../models/notification';
import { MarkPopupComponent } from '../mark-popup/mark-popup.component';

@Component({
  selector: 'notif-nav',
  templateUrl: 'notif-nav.component.html'
})
export class NotifNavComponent {

  /** Show filter menu */
  @Input() showMenu = false;

  /** Notifications list to determine seen count in select popover */
  @Input() notifications: Notification[];

  /** Notification date order */
  @Input() order: boolean;

  /** Emit the action from the select popover */
  @Output() select = new EventEmitter<string>();

  /** Select ref */
  @ViewChild(Select) filterSelect: Select;

  constructor(public store: Store<fromAdmin.State>, private popoverCtrl: PopoverController) {

  }

  /** Set notification date order */
  setOrder(order: boolean) {
    this.store.dispatch(new notifications.SetOrder(order));
  }

  /** Toggle filter menu */
  toggleMenu(toggle: boolean){
    this.store.dispatch(new notifications.ToggleFilterMenu(toggle));
  }

  /** Show select popover for selecting (all/unread/none) notifications */
  showPopover(clickEvent) {

    /** Get the number of unread notifications */
    const unseen = this.notifications.filter((item: Notification) => !item.seen).length;

    /** Create select popover */
    let popover = this.popoverCtrl.create(MarkPopupComponent, {
      unseen: unseen
    });

    /** Emit choice */
    popover.onWillDismiss((choice) => this.select.emit(choice));

    /** Show popover */
    popover.present({ev: clickEvent})
  }
}

