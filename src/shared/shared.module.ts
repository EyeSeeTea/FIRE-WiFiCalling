import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { IonicModule } from 'ionic-angular';

import { HeaderComponent } from './header/header';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    HttpModule,
    OrderModule,
    FilterPipeModule
  ],
  exports: [
    HeaderComponent,
    OrderModule,
    FilterPipeModule
  ]
})
export class SharedModule {
}
