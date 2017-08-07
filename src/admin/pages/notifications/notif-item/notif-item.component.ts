import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../../../models/notification';
import { Store } from "@ngrx/store";

@Component({
  selector: 'notif-item',
  templateUrl: 'notif-item.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifItemComponent {

  temp;
  item: Notification;
  @Input() checked = false;

  @Input('item')
  set setItem(item) {
    this.item = item;
    this.temp = item.newUserAccepted || item.newUserRequest || item.message || item.voucher || item;
  }

  @Output() itemChange = new EventEmitter<Notification>();

  constructor(private store: Store<any>, public cd: ChangeDetectorRef) {

  }

  removeFilter() {
    // this.itemChange.emit({
    //   type:
    // });
  }

  acceptUser() {
    // this.store.dispatch();
    // this.itemChange.emit({
    //   type: Notification
    // });
  }

  rejectUser() {

  }
}

