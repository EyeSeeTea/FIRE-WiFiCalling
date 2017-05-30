import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeaderComponent } from './header';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    IonicPageModule.forChild(HeaderComponent),
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {}
