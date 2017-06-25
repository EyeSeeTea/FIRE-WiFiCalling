import { Injectable } from '@angular/core';
import { VOUCHERS } from './mock-vouchers';
import { Logger } from './logger.service';

@Injectable()
export class VoucherService {
    constructor(private logger: Logger){}

    getVouchers() {
        this.logger.log('Getting vouchers ...')
        for (let i=0; i<VOUCHERS.length; i++){
            this.logger.log("Voucher id: " + VOUCHERS[i].id
                          + " - Voucher owner: " + VOUCHERS[i].user 
                          + " - Voucher state: " + VOUCHERS[i].state)
        }
        return VOUCHERS;
    }
}