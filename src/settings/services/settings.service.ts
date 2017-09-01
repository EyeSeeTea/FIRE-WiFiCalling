import { Injectable } from '@angular/core';
import { FireHttp } from '../../auth/http/fire-http';
import { User } from '../../auth/models/user';

@Injectable()
export class SettingsService {

  endpoint = '/users';

  constructor(private fireHttp: FireHttp) {
  }

  /** Update settings */
  updateSettings(user: User) {
    return this.fireHttp.post(this.endpoint + '/' + user.id, {...user, password: ''})
      .map(res => res.json());
  }
}
