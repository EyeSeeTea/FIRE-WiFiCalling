import { Component, Input } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input()
  userData: {
    name: string,
    phoneNumber: string,
    credit: string,
  };

  constructor() {
  }
}
