import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
})
export class TopupPage {

  constructor(public store: Store<any>) {
  }

}
