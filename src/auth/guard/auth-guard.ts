import { Store } from '@ngrx/store';
import * as Auth from '../../auth/actions/auth';
import { selectAuthStatusState } from '../reducers';
import { State } from '../reducers/auth';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

export class AuthGuard {

  authenticated: boolean;

  constructor(public store: Store<State>) {

    this.store.select(selectAuthStatusState)
      .take(1)
      .map((state: State) => this.authenticated = state.loggedIn)
      .subscribe();
  }

  ionViewCanEnter() {
    if(!this.authenticated) {
      this.store.dispatch(new Auth.RedirectLogin());
    }
    return this.authenticated;
  }
}
