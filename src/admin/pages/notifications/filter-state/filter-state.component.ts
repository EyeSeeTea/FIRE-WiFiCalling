import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filter } from '../../../models/notification';
import * as notifications from '../../../actions/notifications';

@Component({
  selector: 'filter-state',
  templateUrl: 'filter-state.component.html'
})
export class FilterStateComponent {

  @Input() filter: Filter;
  @Output() filterChange = new EventEmitter();

  constructor(private store: Store<any>) {

  }

  ngOnInit() {
    console.log(this.filter);
  }

  /** Set notification filter */
  setFilter(filter: Filter) {
    this.store.dispatch(new notifications.SetFilter(filter));
  }
}

