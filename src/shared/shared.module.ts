import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { IonicModule } from 'ionic-angular';

import { HeaderComponent } from './header/header';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    TimeAgoPipe
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
    FilterPipeModule,
    TimeAgoPipe
  ]
})
export class SharedModule {
}
