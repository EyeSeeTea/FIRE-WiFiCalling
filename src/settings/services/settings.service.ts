import { Injectable } from '@angular/core';
import { FireHttp } from '../../auth/http/fire-http';
import { ISettings } from '../models/settings';

@Injectable()
export class SettingsService {

  endpoint = '/settings';

  constructor(private fireHttp: FireHttp) {
  }

  getSettings() {
    return this.fireHttp.get(this.endpoint).map(res => res.json());
  }

  updateSettings(settings: ISettings) {
    return this.fireHttp.post(this.endpoint, { settings: { ...settings } }).map(res => res.json());
  }
}
