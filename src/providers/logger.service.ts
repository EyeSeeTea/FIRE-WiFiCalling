import { Injectable } from '@angular/core';

@Injectable()
export class Logger {
    logs: string[] = [];

    log(message: string) {
        let date = new Date().toUTCString();
        this.logs.push(date + ": " + message);
        console.log(date + ": " + message);
    }
}