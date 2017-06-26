import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-add-voucher',
  templateUrl: 'addVoucher.html',
})
export class AddVoucherPage {
  public voucherCode: string = '';
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http: Http
      ) {
  }

  topUp(event){

    console.log(this.voucherCode);
    // We should call the web service here
    this.http.post("http://dev.eyeseetea.com:5000/users/kaka/vouchers", {}).subscribe(data => console.log(data),
          err => console.log(err));
  }
}
