import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/do';
import * as Router from '../actions/router';

@Injectable()
export class RouterEffects {

  /** Change main tabs: Prevent the duplication produced by the Ionic tabs system */

  @Effect({dispatch: false})
  navigate$ = this.actions$
    .ofType(Router.NAVIGATE)
    .map((action: Router.Navigate) => action.payload)
    .do((newRoot) => {
      const currRoot = this.app.getRootNav();
      currRoot.popToRoot();
      currRoot.push(newRoot);
    });

  constructor(private actions$: Actions,
              private app: App) {
  }

}
