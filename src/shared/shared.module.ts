import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { IonicModule } from 'ionic-angular';

import { HeaderComponent } from './header/header';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    HttpModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule {
}
