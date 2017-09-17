import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetList } from '../../actions/voucher';
// import { getVouchers } from '../../reducers'
// import { getUser } from '../../../auth/reducers';
import { User } from '../../../auth/models/user';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'list-voucher',
  templateUrl: 'voucher-list.component.html'
})
export class VoucherListComponent implements OnInit {

  searchKey: string;
  authUser: User;
  // vouchers$ = this.store.select(getVouchers);
  vouchers$;

  constructor(private store: Store<any>) {

    this.vouchers$ = of([
      {
        "Vendor": "EstPhonic",
        "activated": "Tue, 26 Jul 2016 23:50:00 GMT",
        "bulkNumber": "bulk-50",
        "code": "voucher1",
        "created": "Tue, 26 Jul 2016 22:50:00 GMT",
        "creditRemaining": 40,
        "creditTotal": 50,
        "depleted": null,
        "id": 1,
        "state": "active",
        "url": "http://vouchers/50"
      },
      {
        "Vendor": "EstPhonic",
        "activated": "Tue, 26 Jul 2015 23:50:00 GMT",
        "bulkNumber": "bulk-50",
        "code": "voucher23",
        "created": "Tue, 26 Jul 2014 22:50:00 GMT",
        "creditRemaining": 40,
        "creditTotal": 50,
        "depleted": null,
        "id": 1,
        "state": "active",
        "url": "http://vouchers/50"
      },
      {
        "Vendor": "EstPhonic",
        "activated": "Tue, 26 Jul 2015 23:50:00 GMT",
        "bulkNumber": "bulk-50",
        "code": "voucher44",
        "created": "Tue, 26 Jul 2014 22:50:00 GMT",
        "creditRemaining": 40,
        "creditTotal": 50,
        "depleted": null,
        "id": 1,
        "state": "pending",
        "url": "http://vouchers/50"
      },
      {
        "Vendor": "EstPhonic",
        "activated": "Tue, 26 Jul 2015 23:50:00 GMT",
        "bulkNumber": "bulk-50",
        "code": "voucher44",
        "created": "Tue, 26 Jul 2014 22:50:00 GMT",
        "creditRemaining": 40,
        "creditTotal": 50,
        "depleted": null,
        "id": 1,
        "state": "depleted",
        "url": "http://vouchers/50"
      },
      {
        "Vendor": "EstPhonic",
        "activated": "Tue, 26 Jul 2015 23:50:00 GMT",
        "bulkNumber": "bulk-50",
        "code": "voucher44",
        "created": "Tue, 26 Jul 2014 22:50:00 GMT",
        "creditRemaining": 40,
        "creditTotal": 50,
        "depleted": null,
        "id": 1,
        "state": "depleted",
        "url": "http://vouchers/50"
      }
    ]);
    /** Get logged in user */
    // store.select(getUser)
    //   .take(1)
    //   .subscribe((user: User) => {
    //     this.authUser = user;
    //   })
  }

  getVouchersList() {
    // this.store.dispatch(new GetList(this.authUser.id));
    this.store.dispatch(new GetList(0));
  }

  ngOnInit() {
    this.getVouchersList();
  }

}

