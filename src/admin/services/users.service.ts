import { Injectable } from '@angular/core';
import { FireHttp } from '../../auth/http/fire-http';
import { User } from "../../auth/models/user";

@Injectable()
export class UsersService {

  endpoint = '/users';

  constructor(private fireHttp: FireHttp) {
  }

  /** Get users list */
  getUsers() {
    return this.fireHttp.get(this.endpoint).map(res => res.json().data);
  }

  getUser(id: number) {
    const endpoint = this.endpoint + '/' + id;
    return this.fireHttp.get(endpoint).map(res => res.json());
  }

  updateUser(id: number) {
    const endpoint = this.endpoint + '/' + id;
    return this.fireHttp.patch(endpoint, {}).map(res => res.json());
  }

  deleteUser(id: number) {
    const endpoint = this.endpoint + '/' + id;
    return this.fireHttp.delete(endpoint).map(res => res.json());
  }

  /** Send message to selected user(s) */
  sendMessage(message: string, users: User[]) {
    return this.fireHttp.get(this.endpoint, {message: message, users: users}).map(res => res.json());
  }

}
