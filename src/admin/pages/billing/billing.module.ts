import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

import { BillingPage } from './billing';
import { PricingFormComponent } from './pricing-form/pricing-form.component';

@NgModule({
  imports: [
    IonicPageModule.forChild(BillingPage),
    TranslateModule.forChild(),
    SharedModule
  ],
  declarations: [
    BillingPage,
    PricingFormComponent
  ],
  exports: [
    BillingPage
  ]
})
export class BillingModule {
}
