import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(RegisterPage),
  ],
  exports: [
    RegisterPage,
    ReactiveFormsModule
  ]
})
export class RegisterPageModule {}
