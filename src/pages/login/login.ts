import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { AppService } from '../../store/app.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
    trigger(
      'slideRegister', [
        transition(':enter', [
          style({transform: 'translateX(100%)'}),
          animate('300ms', style({transform: 'translateX(0)'}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)'}),
          animate('300ms', style({transform: 'translateX(100%)'}))
        ])
      ]
    ),
    trigger(
      'slideLogin', [
        transition(':enter', [
          style({transform: 'translateX(-100%)'}),
          animate('300ms', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)'}),
          animate('300ms', style({transform: 'translateX(-100%)'}))
        ])
      ]
    )
  ]
})

export class LoginPage {

  selectedTab = 'Login';


  constructor(public navCtrl: NavController,
              public appService: AppService) {
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

}
