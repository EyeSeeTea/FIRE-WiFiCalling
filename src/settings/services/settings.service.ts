import { Injectable } from '@angular/core';
import { FireHttp } from '../../auth/http/fire-http';
import { User } from '../../auth/models/user';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class SettingsService {

  // endpoint = '/users';

  constructor(private fireHttp: FireHttp) {
  }

  /** Update settings */
  updateSettings(user: User) {

    /** Workaround for updating http base url */
    this.fireHttp.baseUrl = user.serverHost;
    return of({}).delay(500);
    // return this.fireHttp.post(this.endpoint + '/' + user.id, {...user, password: ''})
    //   .map(res => res.json());
  }
}
