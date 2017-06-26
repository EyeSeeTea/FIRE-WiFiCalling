import { Injectable } from '@angular/core';

@Injectable()
export class Voucher {
  id: number;
  user: string;
  state: string;

  constructor() {
    this.id = 1;
    this.user = 'Carlos';
    this.state = 'inactive';
  }
}
