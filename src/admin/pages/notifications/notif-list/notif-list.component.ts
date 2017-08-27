import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Filter, Notification, NotificationSelect } from '../../../models/notification';
import { NotifItemComponent } from '../notif-item/notif-item.component';
import { filterMenuAnimation } from '../../../animations/admin.animations';
import { Store } from '@ngrx/store';
import { MarkSeen } from '../../../actions/notifications';

@Component({
  selector: 'notif-list',
  templateUrl: 'notif-list.component.html',
  animations: [filterMenuAnimation]
})
export class NotifListComponent implements AfterViewChecked {

  /** Current selected notifications */
  selectedNotifications = [];

  /** Show filter menu */
  @Input() showMenu: boolean;

  /** Notifications list */
  @Input() notifications: Notification[];

  /** Filter notification */
  @Input() filter: Filter;

  /** Notification date order */
  @Input() order: boolean;

  /** Select (check) notifications */
  @Input('select')
  set selectNotifications(choice: string) {

    switch (choice) {
      /** Check all notifications */
      case NotificationSelect.ALL:
        this.notifItems.map((notification: NotifItemComponent) => notification.checked = true);
        break;
      /** Check only unseen notifications */
      case NotificationSelect.UNSEEN:
        this.notifItems
          .filter((notification: NotifItemComponent) => !notification.item.seen)
          .map((notification: NotifItemComponent) => notification.checked = true);
        break;
      /** Uncheck all */
      case NotificationSelect.NONE:
        this.notifItems.map((notification: NotifItemComponent) => notification.checked = false);
        break;
      default:
        return;
    }
  }

  /** Filter emitter for (user_request/user_accepted/topped_up...etc) */
  @Output() filterChange = new EventEmitter<Filter>();

  /** Query notifications' components */
  @ViewChildren(NotifItemComponent) notifItems: QueryList<NotifItemComponent>;

  constructor(private store: Store<any>, private cd: ChangeDetectorRef) {

  }

  /** Mark selected notification as seen */
  markAsSeen() {
    this.store.dispatch(new MarkSeen(this.selectedNotifications));
  }

  ngAfterViewChecked() {

    /** Show the "mark as read" button if admin has checked notifications  */
    if (this.notifItems) {
      this.selectedNotifications = this.notifItems
        .filter((notification: NotifItemComponent) => notification.checked)
        .map((notification: NotifItemComponent) => notification.item.id);
      this.cd.detectChanges();
    }
  }
}

