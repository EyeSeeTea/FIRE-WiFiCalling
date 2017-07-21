import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { Authenticate, RegisterForm } from '../models/user';

@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  login({ username, password }: Authenticate) {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (username !== 'test') {
      return _throw('Invalid username or password');
    }

    return of({ name: username });
  }

  logout() {
    return of(true);
  }

  register(userData: RegisterForm) {

    if (userData === null) {
      return _throw('Invalid register form');
    }

    return of({ name: 'User' });
  }
}
