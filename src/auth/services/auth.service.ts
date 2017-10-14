import { Injectable } from '@angular/core';
import { FireHttp } from '../http/fire-http';
import { Authenticate, RegisterForm } from '../models/user';

@Injectable()
export class AuthService {

  loginEndpoint = '/currentUser';
  endpoint = '/newUserRequests';

  constructor(private fireHttp: FireHttp) {
  }

  login(keys: Authenticate) {
    this.fireHttp.setAuthKeys(keys);
    return this.fireHttp.get(this.loginEndpoint).map(res => res.data);
  }

  register(form: RegisterForm) {
    return this.fireHttp.post(this.endpoint, form);
  }
}
