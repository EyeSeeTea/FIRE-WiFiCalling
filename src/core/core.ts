import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { App, Nav, ViewController } from 'ionic-angular';

import { AppState } from '../store';
import { WiFiCallPage } from '../pages/wificall/wificall';
import { LoginPage } from '../pages/login/login';

type page = { title: string, component: any };

@Component({
  selector: 'main',
  templateUrl: 'core.html'
})
export class Core implements OnInit {

  rootPage = WiFiCallPage;
  activePage: page;

  @Input() state: AppState;
  @Input() pages: Array<page>;

  @ViewChild(Nav) nav: Nav;


  constructor(private appCtrl: App) {

  }

  ngOnInit() {
    /** TODO: Auto login */

    /** Subscribe to page changes event */
    this.appCtrl.viewWillEnter
      .filter((page: ViewController) => !page.enableBack())
      .subscribe((page: ViewController) => {

        /** Check if user is authenticated */
        if (!this.state.authenticated && page.name !== 'LoginPage') {
          this.nav.setRoot('LoginPage');
        }
      });

  }

  openPage(page) {
    this.nav.push(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return this.activePage === page;
  }

}

