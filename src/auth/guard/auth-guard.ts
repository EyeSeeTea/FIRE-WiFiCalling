import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import * as Auth from '../actions/auth';

export class AuthGuard {

  authenticated = false;

  constructor(public store: Store<any>) {

    this.store.take(1).subscribe(state => {
      this.authenticated = !!(state && state.auth && state.auth.status && state.auth.status.loggedIn);
    });

    /** TODO: check how to initialize auth in the root state */
    /** Desired way
     *
     * this.store.select(fromAuth.getLoggedIn).take(1).map(authed => this.authenticated = authed);
     */
  }

  /** Check if page can enter */
  ionViewCanEnter() {

    /** Auth Guard is disabled for dev. uncomment the following to activate */
    // if (!this.authenticated) {
    //   this.store.dispatch(new Auth.LoginRedirect());
    // }
    //
    // return this.authenticated;
  }
}
