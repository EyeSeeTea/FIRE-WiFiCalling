import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'add-voucher',
  templateUrl: 'add-voucher.component.html'
})

export class AddVoucherComponent {

  /** Voucher code */
  code: string;

  /** Form submit event */
  @Output() submit = new EventEmitter();

  onSubmit() {
    if(this.code) {
      this.submit.emit(this.code);
    }
  }

}
