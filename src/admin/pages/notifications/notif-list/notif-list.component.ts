import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PopoverController, Select } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { NotifItemComponent } from '../notif-item/notif-item.component';
import { MarkPopupComponent } from '../mark-popup/mark-popup.component';

import { filterMenuAnimation } from '../../../animations/admin.animations';
import { Filter, Notification } from '../../../models/notification';
import * as notifications from '../../../actions/notifications';

@Component({
  selector: 'notif-list',
  templateUrl: 'notif-list.component.html',
  animations: [filterMenuAnimation],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifListComponent {

  @Input() notifications: Notification [];
  @Input() filter: Filter;

  selectedItems: Notification[] = [];

  @ViewChild('filterSelect') filterSelect: Select;

  /** Notification items to (check all/check unread) */
  @ViewChildren(NotifItemComponent) notifItems: QueryList<NotifItemComponent>;

  /** Show/hide menu */
  filterMenu = false;

  /** Toggle date up/down */
  dateUp = false;

  constructor(public store: Store<any>, public popoverCtrl: PopoverController) {
  }

  presentPopover(myEvent) {
    /** Get the number of unread notifications */
    const unread = this.notifications.filter((item: Notification) => !item.seen).length;

    let popover = this.popoverCtrl.create(MarkPopupComponent, {
      unread: unread
    });

    popover.onWillDismiss((popoverData) => {
      /** Loop over notification items to check them */

      if (popoverData === 'SELLECT_ALL') {
        /** Select all notifications */
        this.notifications
          .forEach((item: Notification) => {
            item.checked = true;
            // item.cd.markForCheck();
            this.selectedItems.push(item);
          });
      } else {
        /** Select only unseen notifications */
        this.notifItems
          .filter((item: NotifItemComponent) => !item.item.seen)
          .map((item: NotifItemComponent) => {
            item.checked = true;
            item.cd.markForCheck();
          });
      }
    });

    /** Show popover */
    popover.present({ev: myEvent})
  }


  // ionViewWillLeave() {
  //   this.filterMenu = false;
  // }

  /** Set notifications filter */
  setFilter(filter: Filter) {
    this.store.dispatch(new notifications.SetFilter(filter));

    /** Close the menu on a filter is selected, unless it is 'filter by user' */
    if (filter) {
      this.filterMenu = filter.name === 'USER_NAME';
    }
  }

}

