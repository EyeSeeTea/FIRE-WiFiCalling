import { Component, Input } from '@angular/core';
import { App, ModalController, NavController } from 'ionic-angular';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { TabsPage } from '../../pages/tabs/tabs';
import { Store } from '@ngrx/store';
import * as Auth from '../../auth/actions/auth';
import { State } from '../../auth/reducers/auth';

type Page = { title: string, component?: any, classes?: string };

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() state: any;

  auth: State = {loggedIn: false, user: null};

  /** Menu items */
  pages: Page[] = [
    {title: 'MENU.HOME', component: TabsPage, classes: 'home-button'},
    {title: 'MENU.ADMIN', component: 'AdminPage', classes: 'admin-button'},
    {title: 'MENU.SETTINGS', component: 'SettingsPage', classes: ''},
    {title: 'MENU.ABOUT', component: 'AboutPage', classes: ''},
    {title: 'MENU.LICENSE', component: 'LicensePage', classes: ''},
    {title: 'MENU.LOGOUT'}
  ];

  constructor(private store: Store<any>, private app: App, private nav: NavController, private modal: ModalController) {
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
    } else {
      /** If the user is not admin, remove the admin button */
      // if (!this.auth.user.admin) {
      //   pages = this.pages.filter((page: Page) => page.title !== 'MENU.ADMIN');
      // }
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
        } else if (page.title === 'MENU.ADMIN' || page.title === 'MENU.HOME') {
          this.app.getRootNavs()[0].push(page.component);
        } else {
          this.nav.push(page.component);
        }
      }
    });

    menu.present();
  }
}
