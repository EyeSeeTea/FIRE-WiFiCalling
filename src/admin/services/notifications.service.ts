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
    return this.fireHttp.get(this.notificationsEndpoint).map(res => res.data);
  }

  /** Accept selected user(s) */
  acceptUser(id: number) {
    const endpoint = `${this.requestUserEndpoint}/${id}/acceptation`;
    return this.fireHttp.post(endpoint, {});
  }

  /** Reject selected user(s) */
  rejectUser(id: number) {
    const endpoint = `${this.requestUserEndpoint}/${id}/rejection`;
    return this.fireHttp.post(endpoint, {});
  }

  /** Mark notification as seen */
  markSeen(ids: number[], seen: boolean) {
    /** TODO: refactor with the mark as seen endpoint */
    const endpoint = `markAsSeenEndpoint/${ids}`;
    return this.fireHttp.post(endpoint, {seen: seen});
  }


}
