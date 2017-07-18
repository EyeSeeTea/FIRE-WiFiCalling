import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header/header';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    HttpModule,
    TranslateModule.forChild()
  ],
  exports: [
    HeaderComponent,
    TranslateModule
  ]
})
export class SharedModule {
}
