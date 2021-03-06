import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { UsersPage } from './users';
import { SharedModule } from '../../../shared/shared.module';
import { UserItemComponent } from './user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserNavComponent } from './user-nav/user-nav.component';

@NgModule({
  imports: [
    IonicPageModule.forChild(UsersPage),
    TranslateModule.forChild(),
    SharedModule
  ],
  declarations: [
    UsersPage,
    UserItemComponent,
    UserListComponent,
    UserNavComponent
  ],
  exports: [
    UsersPage
  ]
})
export class UsersModule {
}
