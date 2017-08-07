import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from '../../../models/notification';

@Component({
  selector: 'filter-state',
  templateUrl: 'filter-state.component.html'
})
export class FilterStateComponent {

  @Input() filter: Filter;
  @Output() filterChange = new EventEmitter();

  removeFilter(){
    this.filterChange.emit(null);
  }
}

