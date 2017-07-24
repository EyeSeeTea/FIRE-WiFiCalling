import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../effects/auth.effects';
import { reducers } from '../reducers';

import { AuthPage } from './auth';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

@NgModule({
  imports: [
    IonicPageModule.forChild(AuthPage),
    TranslateModule.forChild(),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
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
