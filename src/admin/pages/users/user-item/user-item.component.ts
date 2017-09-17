import { Component, Input } from '@angular/core';
import { User } from '../../../../auth/models/user';

@Component({
  selector: 'user-item',
  templateUrl: 'user-item.component.html'
})
export class UserItemComponent {

  @Input() checked: boolean;
  @Input() item: User;

}
