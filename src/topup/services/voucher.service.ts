import { Injectable } from '@angular/core';
import { FireHttp } from '../../auth/http/fire-http';
import { Voucher } from '../models/voucher';
import { of } from 'rxjs/observable/of';

@Injectable()
export class VoucherService {

  endpoint = '/users';

  constructor(private fireHttp: FireHttp) {
  }

  /** Get user's voucher list */
  getVoucher(userId: number) {
    // return this.fireHttp.get(`${this.endpoint}/${userId}/vouchers`).map(res => res.json());
    return of([]);
  }

  /** Add new voucher to user's account */
  addVoucher(userId, voucher: Voucher) {
    return this.fireHttp.post(`${this.endpoint}/${userId}/vouchers`, { voucher: voucher });
  }

}
