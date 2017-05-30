import { Injectable } from '@angular/core';

@Injectable()
export class UserData {
  name: string;
  phoneNumber: string;
  credit: string;

  constructor() {
    this.name = 'Carlos';
    this.phoneNumber = '123-456-789';
    this.credit = 'R 99';
  }
}
