import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from './app.state';
import { AppStore } from './app.reducer';

/** This service is just a wrapper for the store, it ease the use of the store specially from the templates */

@Injectable()
export class AppService {

  constructor(private store: Store<AppState>) {

  }

  /** Register */
  register(form) {
    this.store.dispatch({type: AppStore.REGISTER, payload: form});
  }

  /** Login */
  login(user: string, pass: string) {
    this.store.dispatch({type: AppStore.LOGIN, payload: {username: user, password: pass}});
  }

  /** Logout */
  logout() {
    this.store.dispatch({type: AppStore.LOGOUT});
  }

}
