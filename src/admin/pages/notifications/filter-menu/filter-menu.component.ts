import { Component, Input, OnInit } from '@angular/core';
import { Filter, NotificationFilter } from '../../../models/notification';
import { Store } from '@ngrx/store';
import { SetFilter } from '../../../actions/notifications';
import { filterMenuAnimation, filterMenuListAnimation } from '../../../animations/admin.animations';

@Component({
  selector: 'filter-menu',
  templateUrl: 'filter-menu.component.html',
  animations: [filterMenuAnimation, filterMenuListAnimation]
})
export class FilterMenuComponent implements OnInit {

  filterOptions = [];
  @Input() show: boolean;

  constructor(private store: Store<any>) {

  }

  ngOnInit() {
    /** Show available filters */
    for (let key in NotificationFilter) {

      /** exclude username filter since it has an input */
      if (key !== NotificationFilter.USER_NAME) {
        this.filterOptions.push({name: NotificationFilter[key]});
      }
    }
  }

  /** Set notifications filter */
  setFilter(filter: Filter) {
    this.store.dispatch(new SetFilter(filter));
  }

  /** Filter notifications by username */
  filterByName(key: string) {
    const filter: Filter = {name: NotificationFilter.USER_NAME, value: key};
    this.setFilter(filter);
  }
}

