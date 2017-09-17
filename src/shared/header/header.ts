import { Component, Input } from '@angular/core';
import { App, ModalController } from 'ionic-angular';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { TabsPage } from '../../pages/tabs/tabs';
import { Store } from '@ngrx/store';
import * as Auth from '../../auth/actions/auth';
import { State } from '../../auth/reducers/auth';

type Page = { title: string, component?: any, color?: string };

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() title: string;

  /** Initial auth state */
  auth: State = {loggedIn: false, user: null};

  /** Menu items */
  pages: Page[] = [
    {title: 'MENU.HOME', component: TabsPage, color: 'primary'},
    {title: 'MENU.ADMIN', component: 'AdminPage', color: 'brown'},
    {title: 'MENU.SETTINGS', component: 'SettingsPage', color: 'lightgray'},
    {title: 'MENU.ABOUT', component: 'AboutPage', color: 'lightgray'},
    {title: 'MENU.LICENSE', component: 'LicensePage', color: 'lightgray'},
    {title: 'MENU.LOGOUT', color: 'danger'}
  ];

  constructor(private store: Store<any>, private app: App, private modal: ModalController) {

    /** Get auth state from the store */
    store.subscribe((state: any) => this.auth = state.auth.status || null);
  }

  /** Open menu dialog */
  openMenu() {
    let pages = this.pages;
    let cssClass = 'main-menu';

    /** If user is logged in show full menu */
    if (!this.auth.loggedIn) {

      /** If user is not logged in, then:
       * - Add 'guest' class to menu to set shorter menu height
       * - Remove 'home', 'admin' and 'logout' buttons
       * */
      cssClass += ' guest';
      pages = this.pages.filter(page => {
        return page.title !== 'MENU.HOME'
          && page.title !== 'MENU.ADMIN'
          && page.title !== 'MENU.LOGOUT'
      });
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
          this.app.getRootNavs()[0].push(page.component);
        }
      }
    });

    menu.present();
  }
}
