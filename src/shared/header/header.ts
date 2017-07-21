import { Component, Input } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() state: any;

  constructor() {
  }
}
