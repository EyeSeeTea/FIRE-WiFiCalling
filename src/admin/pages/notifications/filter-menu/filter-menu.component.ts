import { Component, OnInit } from '@angular/core';
import { Filter, NotificationFilter } from '../../../models/notification';
import { Store } from '@ngrx/store';
import * as notifications from '../../../actions/notifications';

@Component({
  selector: 'filter-menu',
  templateUrl: 'filter-menu.component.html'
})
export class FilterMenuComponent implements OnInit {

  filterOptions = [];

  constructor(private store: Store<any>) {

  }

  ngOnInit() {
    /** Show available filters */
    for (let key in NotificationFilter) {

      /** exclude username filter since it has an input */
      if (key !== NotificationFilter.USER_NAME) {
        this.filterOptions.push({ name: NotificationFilter[key]});
      }
    }
  }

  /** Set notifications filter */
  setFilter(filter: Filter) {
    this.store.dispatch(new notifications.SetFilter(filter));
  }

  /** Filter notifications by username */
  filterByName(key: string) {
    const filter: Filter = {name: NotificationFilter.USER_NAME, value: key};
    this.setFilter(filter);
  }
}

