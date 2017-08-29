import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

import { AuthPage } from './auth';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

@NgModule({
  imports: [
    IonicPageModule.forChild(AuthPage),
    TranslateModule.forChild(),
    SharedModule
  ],
  declarations: [
    AuthPage,
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    AuthPage,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule {
}
