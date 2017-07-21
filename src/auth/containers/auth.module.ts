import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthService } from '../services/auth.service';
// import { AuthGuard } from './services/auth-guard.service';
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
  providers: [AuthService],
  exports: [
    AuthPage,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule {
}
