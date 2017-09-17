import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filter } from '../../../models/notification';
import * as Notifications from '../../../actions/notifications';

@Component({
  selector: 'filter-state',
  templateUrl: 'filter-state.component.html'
})
export class FilterStateComponent {

  @Input() show: boolean;
  @Input() filter: Filter;
  @Output() filterChange = new EventEmitter();

  constructor(private store: Store<any>) {
  }

  /** Set notification filter */
  setFilter(filter: Filter) {
    this.store.dispatch(new Notifications.SetFilter(filter));
  }
}

