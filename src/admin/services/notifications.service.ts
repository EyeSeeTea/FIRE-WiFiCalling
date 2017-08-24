import { Injectable } from '@angular/core';
import { FireHttp } from '../../auth/http/fire-http';

@Injectable()
export class NotificationsService {

  notificationsEndpoint = '/notifications';
  requestUserEndpoint = '/newUserRequests';

  constructor(private fireHttp: FireHttp) {
  }

  /** Get admin notifications */
  getNotifications(filter?) {
    return this.fireHttp.get(this.notificationsEndpoint).map(res => res.json().data);
  }

  /** Accept selected user(s) */
  acceptUser(id: number) {
    const endpoint = `${this.requestUserEndpoint}/${id}/acceptation`;
    return this.fireHttp.post(endpoint, {}).map(res => res.json());
  }

  /** Reject selected user(s) */
  rejectUser(id: number) {
    const endpoint = `${this.requestUserEndpoint}/${id}/rejection`;
    return this.fireHttp.post(endpoint, {}).map(res => res.json());
  }

  /** Mark notification as seen */
  markSeen(id: number, seen: boolean) {
    const endpoint = `${this.notificationsEndpoint}/${id}`;
    return this.fireHttp.patch(endpoint, {seen: seen});
  }


}
