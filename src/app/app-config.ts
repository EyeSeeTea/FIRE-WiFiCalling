import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
    apiEndpoint: string;
    user: string;
    pass: string;
    userID: number;
}

export const VOUCHER_DI_CONFIG: AppConfig = {
    apiEndpoint: "http://dev.eyeseetea.com:5000",
    user: 'joel',
    pass: 'joel1234',
    userID: 1
}