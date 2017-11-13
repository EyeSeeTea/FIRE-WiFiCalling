import { Store } from '@ngrx/store';
import * as Auth from '../../auth/actions/auth';
import { selectAuthStatusState } from '../reducers';
import { State } from '../reducers/auth';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

export class AdminGuard {

  authorized: boolean;

  constructor(public store: Store<State>) {

    this.store.select(selectAuthStatusState)
      .take(1)
      .map((state: State) => this.authorized = state.loggedIn && state.user.admin)
      .subscribe();
  }

  ionViewCanEnter() {
    if (!this.authorized) {
      this.store.dispatch(new Auth.RedirectLogin());
    }
    return this.authorized;
  }
}
