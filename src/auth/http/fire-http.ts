import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Authenticate } from '../models/user';

@Injectable()
export class FireHttp extends HttpClient {

  baseUrl = 'http://dev.eyeseetea.com:5001';
  private keys: Authenticate;

  constructor(handler: HttpHandler, secureStorage: SecureStorage) {

    super(handler);

    secureStorage.create('fire-app').then((storage: SecureStorageObject) => {
      console.log('SecureStorage is loaded');
      storage.get('keys')
        .then(
          data => {
            this.keys = <Authenticate>JSON.parse(data);
            console.log('SecureStorage got the keys:', data);
          },
          error => console.log('SecureStorage could not get the keys:', error)
        );
    }).catch(err => {
      console.log('SecureStorage not loaded')
    });
  }

  get(endpoint, args?): Observable<any> {
    return super.get(this.baseUrl + endpoint, this.getHeaders());
  }

  post(endpoint, body): Observable<any> {
    return super.post(this.baseUrl + endpoint, body, this.getHeaders());
  }

  put(endpoint, body): Observable<any> {
    return super.put(this.baseUrl + endpoint, body, this.getHeaders());
  }

  patch(endpoint, body): Observable<any> {
    return super.patch(this.baseUrl + endpoint, body, this.getHeaders());
  }

  delete(endpoint): Observable<any> {
    return super.delete(this.baseUrl + endpoint, this.getHeaders());
  }

  getHeaders() {
    const headers = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(this.keys.username + ':' + this.keys.password));
    return {headers};
  }

  setAuthKeys(keys: Authenticate) {
    this.keys = keys;
  }

}
