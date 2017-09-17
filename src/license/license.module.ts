import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { LicensePage } from './license';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicPageModule.forChild(LicensePage),
    TranslateModule.forChild(),
    SharedModule
  ],
  declarations: [
    LicensePage
  ],
  exports: [
    LicensePage
  ]
})
export class LicenseModule {
}
