import { AppStore } from './app.reducer';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AppEffects {
    constructor(
        private http: Http,
        private actions$: Actions
    ) { }

    /** Login, for the sake of example I will use get to receive user data */

    @Effect() login$ = this.actions$
        .ofType(AppStore.LOGIN)
        .map(action => JSON.stringify(action.payload))
        .switchMap(payload => this.http.get('../assets/mock.json')
            .map(res => ({ type: AppStore.LOGGED_IN, payload: res.json() }))
            .catch((e) => Observable.of({ type: AppStore.ERROR, payload: e }))
        );
}
