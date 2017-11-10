import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/observable/throw';
import { Authenticate } from '../models/user';

@Injectable()
export class FireHttp extends HttpClient {

  baseUrl = 'http://dev.eyeseetea.com:5001';
  private keys: Authenticate;

  constructor(handler: HttpHandler) {
    super(handler);
  }

  get(endpoint, args?): Observable<any> {
    return super.get(this.baseUrl + endpoint, this.getHeaders()).retryWhen((errors: any) => Observable.throw(errors));
  }

  post(endpoint, body): Observable<any> {
    return super.post(this.baseUrl + endpoint, body, this.getHeaders()).retryWhen((errors: any) => Observable.throw(errors));
  }

  put(endpoint, body): Observable<any> {
    return super.put(this.baseUrl + endpoint, body, this.getHeaders()).retryWhen((errors: any) => Observable.throw(errors));
  }

  patch(endpoint, body): Observable<any> {
    return super.patch(this.baseUrl + endpoint, body, this.getHeaders()).retryWhen((errors: any) => Observable.throw(errors));
  }

  delete(endpoint): Observable<any> {
    return super.delete(this.baseUrl + endpoint, this.getHeaders()).retryWhen((errors: any) => Observable.throw(errors));
  }

  getHeaders() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.keys.username + ':' + this.keys.password));
    return {headers};
  }

  setAuthKeys(keys: Authenticate) {
    this.keys = keys;
  }

}
