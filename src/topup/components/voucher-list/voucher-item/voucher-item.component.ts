import { Component, Input } from '@angular/core';
import { Voucher } from '../../../models/voucher';

@Component({
  selector: 'voucher-item',
  templateUrl: 'voucher-item.component.html'
})
export class VoucherItemComponent {

  @Input() voucher: Voucher;

}

