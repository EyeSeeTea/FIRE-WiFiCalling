import { Injectable } from '@angular/core';
import { FireHttp } from '../../auth/http/fire-http';

@Injectable()
export class BillingService {

  endpoint = '/pricing';

  constructor(private fireHttp: FireHttp) {
  }

  /** Get billing prices */
  getPricing() {
    return this.fireHttp.get(this.endpoint).map(res => res.data);
  }

  /** Update billing prices */
  updatePricing(pricing) {
    return this.fireHttp.patch(this.endpoint, pricing);
  }
}
