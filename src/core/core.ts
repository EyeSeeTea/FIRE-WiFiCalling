import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Nav } from 'ionic-angular';

import { AppState } from '../store';
import { TabsPage } from '../pages/tabs/tabs';

type page = { title: string, component: any };

@Component({
  selector: 'main',
  templateUrl: 'core.html'
})
export class Core implements OnInit {

  rootPage = TabsPage;
  activePage: page;

  @Input() state: AppState;
  @Input() pages: Array<page>;

  @ViewChild(Nav) nav: Nav;


  // constructor(private appCtrl: App) { }

  ngOnInit() {
    /** Disable auth guard for development purpose */
    /** TODO: Activate this in prod */

    // /** Subscribe to page changes event */
    // this.appCtrl.viewWillEnter
    //   .filter((page: ViewController) => !page.enableBack())
    //   .subscribe((page: ViewController) => {

    /** TODO: Check why it performs two times per change */
    /** "CanEnter" bug: https://github.com/ionic-team/ionic/issues/10399 */

    // /** Check if user is authenticated */
    //   if (!this.state.authenticated && page.name !== 'AccessPage') {
    //     this.nav.setRoot('AccessPage');
    //   }
    // });

  }

  openPage(page) {
    this.nav.push(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return this.activePage === page;
  }

}

