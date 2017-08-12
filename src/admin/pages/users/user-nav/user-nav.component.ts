import { Component, Input } from '@angular/core';
import { UserListOptions } from '../../../models/user';
import { searchUserAnimation } from '../../../animations/admin.animations';

@Component({
  selector: 'user-nav',
  templateUrl: 'user-nav.component.html',
  animations: [searchUserAnimation]
})
export class UserNavComponent {

  @Input() options: UserListOptions;

}

