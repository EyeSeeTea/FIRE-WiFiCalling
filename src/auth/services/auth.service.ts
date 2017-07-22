import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { FireHttp } from '../http/fire-http';
import { Authenticate, RegisterForm } from '../models/user';

@Injectable()
export class AuthService {

  constructor(private fire: FireHttp) {
  }

  login(keys: Authenticate) {
    this.fire.setAuthKeys(keys);
    return this.fire.get('/users').map(res => res.json());
  }

  logout() {
    return of(true);
  }

  register(userData: RegisterForm) {
    return this.fire.post('/newUserRequests', userData).map(res => res.json());
  }
}
