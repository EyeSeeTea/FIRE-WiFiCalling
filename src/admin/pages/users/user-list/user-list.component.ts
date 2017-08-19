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
import { User, UserListOptions } from '../../../models/user';
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements AfterViewChecked {

  /** Current selected users */
  selectedUsers: User[] = [];

  /** User list options */
  @Input() options: UserListOptions;

  /** Users list */
  @Input() users: User[];

  /** Message emitter to open send message dialog */
  @Output() message = new EventEmitter<User[]>();

  /** Query users' components */
  @ViewChildren(UserItemComponent) userItems: QueryList<UserItemComponent>;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngAfterViewChecked() {

    /** Set selected users and show send message button if they exist  */
    if (this.userItems) {
      this.selectedUsers = this.userItems
        .filter((user: UserItemComponent) => user.checked)
        .map((user: UserItemComponent) => user.item);
      this.cd.detectChanges();
    }
  }

}

