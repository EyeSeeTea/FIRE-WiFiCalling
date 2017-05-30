import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopupPage } from './topup';

@NgModule({
  declarations: [
    TopupPage,
  ],
  imports: [
    IonicPageModule.forChild(TopupPage),
  ],
  exports: [
    TopupPage
  ]
})
export class TopupPageModule {}
