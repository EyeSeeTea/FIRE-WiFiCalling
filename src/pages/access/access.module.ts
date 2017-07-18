import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccessPage } from './access';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccessPage,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    IonicPageModule.forChild(AccessPage),
    TranslateModule.forChild()
  ],
  exports: [
    AccessPage,
    LoginComponent,
    RegisterComponent
  ]
})
export class AccessPageModule {}
