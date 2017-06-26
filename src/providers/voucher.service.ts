import { Inject, Injectable } from '@angular/core';
import { VOUCHERS } from './mock-vouchers';
import { Logger } from './logger.service';
import { Http, Response, Headers } from '@angular/http';
import { APP_CONFIG, VOUCHER_DI_CONFIG, AppConfig } from '../app/app-config';

@Injectable()
export class VoucherService {
    private serverURL: string;
    private userID: number;
    private user: string;
    private pass: string;
    private voucherLogger: Logger;

    constructor(
        private logger: Logger,
        private http: Http,
        @Inject(APP_CONFIG) config: AppConfig
        ) { 
            this.serverURL = config.apiEndpoint;
            this.user = config.user;
            this.pass = config.pass;
            this.userID = config.userID;
            this.voucherLogger = logger;
        }

    getVouchersFromServer() {
        // TODO: check null on AppConfig members
        let url = this.buildURL();
        let headers = this.buildBasicAuthHeaders();
        this.logger.log('Getting vouchers from server: ' + this.serverURL + ' ...');
        this.http.get(url, {headers: headers})
            .subscribe(response => {
                this.voucherLogger.log("Authorization successful");
                console.log(response.json);
            }, (err) => {
                this.voucherLogger.log("Authorization failed");
            });
    }

    buildURL (): any {
        let url = [ this.serverURL, 'users' ,this.userID, 'vouchers' ].join('/');
        return url;
    }

    buildBasicAuthHeaders (): any {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(this.user + ':' + this.pass));
        return headers;
    }

    getVouchersFromMock() {
        this.logger.log('Getting vouchers from mock ...');
        for (let i=0; i<VOUCHERS.length; i++){
            this.logger.log("Voucher id: " + VOUCHERS[i].id
                          + " - Voucher owner: " + VOUCHERS[i].user 
                          + " - Voucher state: " + VOUCHERS[i].state)
        }
        return VOUCHERS;
    }
}