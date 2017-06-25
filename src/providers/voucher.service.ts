import { Injectable } from '@angular/core';
import { VOUCHERS } from './mock-vouchers';

@Injectable()
export class VoucherService {
    getVouchers() {
        return VOUCHERS;
    }
}