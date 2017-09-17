import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AboutPage } from './about';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicPageModule.forChild(AboutPage),
    TranslateModule.forChild(),
    SharedModule
  ],
  declarations: [
    AboutPage
  ],
  exports: [
    AboutPage
  ]
})
export class AboutModule {
}
