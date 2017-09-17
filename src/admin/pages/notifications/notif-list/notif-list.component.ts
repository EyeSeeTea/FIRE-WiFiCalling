import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from "rxjs/Subject";
import * as Notifications from '../../../actions/notifications';
import { Filter, Notification, NotificationSelect } from '../../../models/notification';
import { NotifItemComponent } from '../notif-item/notif-item.component';
import { filterMenuAnimation } from '../../../animations/admin.animations';

@Component({
  selector: 'notif-list',
  templateUrl: 'notif-list.component.html',
  animations: [filterMenuAnimation]
})
export class NotifListComponent implements AfterViewChecked, OnDestroy {

  /** Checked notifications' ids */
  checkedNotifications = [];

  /** Show filter menu */
  @Input() showMenu: boolean;

  /** Notifications list */
  @Input() notifications: Notification[];

  /** Filter notification */
  @Input() filter: Filter;

  /** Notification date order */
  @Input() order: boolean;

  /** Check notification event */
  check$ = new Subject<string>();

  /** Filter emitter for (user_request/user_accepted/topped_up...etc) */
  @Output() filterChange = new EventEmitter<Filter>();

  /** Query notifications' components */
  @ViewChildren(NotifItemComponent) notifItems: QueryList<NotifItemComponent>;

  constructor(private store: Store<any>, private cd: ChangeDetectorRef) {

    /** Activate check notification event */
    this.check$.subscribe((option: string) => {

      switch (option) {
        case NotificationSelect.ALL:
          this.checkAll(true);
          break;
        case NotificationSelect.UNSEEN:
          this.checkUnseen();
          break;
        case NotificationSelect.NONE:
          this.checkAll(false);
          break;
        default:
          return;
      }
    });
  }

  /** Check/Uncheck all notifications */
  checkAll(checked: boolean) {
    this.notifItems.map((notification: NotifItemComponent) => notification.checked = checked);
  }

  /** Check unseen notifications only */
  checkUnseen() {
    this.notifItems
      .filter((notification: NotifItemComponent) => !notification.item.seen)
      .map((notification: NotifItemComponent) => notification.checked = true);
  }

  /** Mark checked notification as seen */
  markAsSeen() {
    this.store.dispatch(new Notifications.MarkSeen(this.checkedNotifications));
  }

  ngAfterViewChecked() {

    /** Show the "mark as read" button if admin has checked notifications  */
    if (this.notifItems) {
      this.checkedNotifications = this.notifItems
        .filter((notification: NotifItemComponent) => notification.checked)
        .map((notification: NotifItemComponent) => notification.item.id);
      this.cd.detectChanges();
    }
  }

  ngOnDestroy() {
    this.check$.unsubscribe();
  }
}

