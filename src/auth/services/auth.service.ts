import { Injectable } from '@angular/core';
import { FireHttp } from '../http/fire-http';
import { Authenticate, RegisterForm } from '../models/user';

@Injectable()
export class AuthService {

  constructor(private fireHttp: FireHttp) {
  }

  login(keys: Authenticate) {
    this.fireHttp.setAuthKeys(keys);
    return this.fireHttp.get('/users').map(res => res.json());
  }

  register(form: RegisterForm) {
    /** TODO: remove the hardcoded username when the registration design is complete
     * issue: https://github.com/EyeSeeTea/FIRE-WiFiCalling/issues/37 */
    return this.fireHttp.post('/newUserRequests', { user: { ...form, username: 'hardcoded' } }).map(res => res.json());
  }
}
