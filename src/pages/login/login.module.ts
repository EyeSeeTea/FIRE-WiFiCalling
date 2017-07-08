import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginPage,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    IonicPageModule.forChild(LoginPage)
  ],
  exports: [
    LoginPage,
    LoginComponent,
    RegisterComponent
  ]
})
export class LoginPageModule {}
