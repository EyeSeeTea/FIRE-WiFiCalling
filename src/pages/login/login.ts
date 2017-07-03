import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AppService } from '../../store/app.service';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
    constructor(
        public navCtrl: NavController,
        public appService: AppService
    ) {
    }

    register() {
      this.navCtrl.push('RegisterPage');
    }

}
