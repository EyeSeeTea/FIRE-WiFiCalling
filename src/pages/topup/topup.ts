import { AppState } from './../../store';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
})
export class TopupPage {
  constructor(public store: Store<AppState>) {
  }
}
