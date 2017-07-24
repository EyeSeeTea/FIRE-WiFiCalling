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
    return this.fireHttp.post('/newUserRequests', form).map(res => res.json());
  }
}
