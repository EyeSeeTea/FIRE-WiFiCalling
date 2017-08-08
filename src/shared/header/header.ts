import { Component, Input } from '@angular/core';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() state: AppState;

  constructor() {
  }
}
