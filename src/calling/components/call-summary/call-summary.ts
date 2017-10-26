import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'call-summary',
  templateUrl: 'call-summary.html'
})

export class CallSummary {

  rated = false;

  constructor(public store: Store<any>, public viewCtrl: ViewController) {
  }

  onRate(e) {
    console.log(e);
    this.rated = true;
  }

}
