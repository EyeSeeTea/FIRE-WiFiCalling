import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'menu-dialog',
  templateUrl: 'menu-dialog.component.html'
})
export class MenuDialogComponent implements OnInit {

  pages = [];

  constructor(public params: NavParams, public viewCtrl: ViewController) {
  }

  ngOnInit() {
    const pages = this.params.get('pages');
    const currentPage = this.params.get('currentPage');
    this.pages = pages.filter((page) => page !== currentPage);
  }
}
