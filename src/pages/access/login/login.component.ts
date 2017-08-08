import { Component } from '@angular/core';
import { AppService } from '../../../store/app.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent {

  constructor(public appService: AppService) {
  }

}
