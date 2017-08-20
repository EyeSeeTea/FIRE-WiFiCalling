import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from '../effects/settings.effects';
import { reducers } from '../reducers';

import { SettingsService } from '../services/settings.service';
import { SettingsPage } from './settings';
import { SettingsFormComponent } from './settings-form/settings-form.component';

@NgModule({
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild(),
    StoreModule.forFeature('settings', reducers),
    EffectsModule.forFeature([SettingsEffects]),
  ],
  declarations: [
    SettingsPage,
    SettingsFormComponent
  ],
  exports: [
    SettingsPage
  ],
  providers: [
    SettingsService
  ]
})
export class AuthModule {
}
