import { Component, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { NotificationFilter } from '../../../models/notification';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'filter-menu',
  templateUrl: 'filter-menu.component.html'
})
export class FilterMenuComponent implements AfterViewInit, OnDestroy {

  @Output() filterChange = new EventEmitter();

  searchControl = new FormControl();
  sub: Subscription;

  filterByUserRequest() {
    this.filterChange.emit({
      name: NotificationFilter.USER_REQUEST
    });
  }

  filterByUserAccepted() {
    this.filterChange.emit({
      name: NotificationFilter.USER_ACCEPTED
    });
  }

  filterByMessageSent() {
    this.filterChange.emit({
      name: NotificationFilter.MESSAGE_SENT
    });
  }

  filterByProfileUpdate() {
    this.filterChange.emit({
      name: NotificationFilter.PROFILE_UPDATED
    });
  }

  filterByToppedUp() {
    this.filterChange.emit({
      name: NotificationFilter.TOPPED_UP
    });
  }

  ngAfterViewInit() {

    this.sub = this.searchControl.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe((text: string) => {
        if (text) {
          this.filterChange.emit({
            name: NotificationFilter.USER_NAME,
            value: text
          });
        } else {
          this.filterChange.emit(null);
        }
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

