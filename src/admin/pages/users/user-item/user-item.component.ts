import { Component, Input } from '@angular/core';
import { User } from '../../../models/user';

/** We are forced not to use 'ChangeDetectionStrategy.OnPush' because ngModel doesn't work it
 *  bug issue: https://github.com/angular/angular/issues/10816 */

@Component({
  selector: 'user-item',
  templateUrl: 'user-item.component.html'
})
export class UserItemComponent {

  @Input() checked: boolean;
  @Input() item: User;

}

