import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'user-item',
  templateUrl: 'user-item.component.html'
})
export class UserItemComponent {

  @Input() item: User;
  @Output() itemChange = new EventEmitter<User>();

  checked = false;

  constructor() {

  }
  ngOnInit() {

  }
}

