import { Component, OnDestroy } from '@angular/core';
import { App, ModalController } from 'ionic-angular';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { TabsPage } from '../../pages/tabs/tabs';
import { Store } from '@ngrx/store';
import * as Auth from '../../auth/actions/auth';
import { selectAuthStatusState } from '../../auth/reducers';
import { State } from '../../auth/reducers/auth';
import { Subscription } from 'rxjs/Subscription';

type Page = { title: string, component?: any, color?: string };

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent implements OnDestroy {

  /** Initial auth state */
  auth: State;
  authObs$: Subscription;

  /** Menu items */
  pages: Page[] = [
    {title: 'MENU.HOME', component: TabsPage, color: 'primary'},
    {title: 'MENU.ADMIN', component: 'AdminPage', color: 'brown'},
    {title: 'MENU.SETTINGS', component: 'SettingsPage', color: 'lightgray'},
    {title: 'MENU.ABOUT', component: 'AboutPage', color: 'lightgray'},
    {title: 'MENU.LICENSE', component: 'LicensePage', color: 'lightgray'},
    {title: 'MENU.LOGOUT', color: 'danger'}
  ];

  constructor(private store: Store<State>,
              private app: App,
              private modal: ModalController) {

    /** Get auth state from the store */
    this.authObs$ = this.store.select(selectAuthStatusState)
      .subscribe((auth: State) => this.auth = auth);
  }

  /** Open menu dialog */
  openMenu() {
    let pages = this.pages;
    let cssClass = 'main-menu';

    if (!this.auth.loggedIn) {

      /** If user is not logged in, then:
       * - Add 'guest' class to menu to set the proper height
       * - Remove 'Home', 'Admin' and 'Logout' buttons
       */
      cssClass += ' guest';
      pages = this.pages.filter(page =>
        page.title !== 'MENU.HOME' &&
        page.title !== 'MENU.ADMIN' &&
        page.title !== 'MENU.LOGOUT'
      );
    } else if (!this.auth.user.admin) {
      /** If logged in but not an Admin user, then
       * - Add 'guest' class to menu to set the proper height
       * - Remove 'Home' and 'Admin' buttons
       */
      cssClass += ' not-admin';
      pages = this.pages.filter(page =>
        page.title !== 'MENU.HOME' &&
        page.title !== 'MENU.ADMIN'
      );
    }

    const menu = this.modal.create(MenuDialogComponent,
      {pages: pages},
      {cssClass: cssClass}
    );

    menu.onDidDismiss(page => {
      /** Navigate to page */
      if (page) {
        if (page.title === 'MENU.LOGOUT') {
          this.store.dispatch(new Auth.Logout());
        } else {
          this.app.getRootNav().push(page.component);
        }
      }
    });

    menu.present();
  }

  ngOnDestroy() {
    if (this.authObs$) {
      this.authObs$.unsubscribe();
    }
  }
}
