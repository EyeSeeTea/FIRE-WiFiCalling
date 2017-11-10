import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPage {

  history;

  constructor(public store: Store<any>) {

    const minDate = new Date('October 13, 2016 11:13:00');
    const maxDate = Date.now();

    this.history = [
      {
        displayName: 'Jamee Seals',
        phoneNumber: '111 2222 333 45',
        type: 'outgoing',
        date: randomDate(minDate, maxDate, '12', '0'),
        missed: true
      },
      {
        displayName: 'Coreen Boomer',
        phoneNumber: '111 7777 333 45',
        type: 'incoming-call',
        date: randomDate(minDate, maxDate, '12', '0'),
        missed: false
      }, {
        displayName: 'Ruben Gangi',
        phoneNumber: '222 2222 333 45',
        type: 'incoming-call',
        date: randomDate(minDate, maxDate, '12', '0'),
        missed: false
      }, {
        displayName: 'Carlos',
        phoneNumber: '111 2222 444 44',
        type: 'incoming-call',
        date: randomDate(minDate, maxDate, '12', '0'),
        missed: true
      }, {
        displayName: 'Vasiliki Mccall',
        phoneNumber: '111 2222 444 44',
        type: 'outgoing',
        date: randomDate(minDate, maxDate, '12', '0'),
        missed: true
      }, {
        displayName: 'Donny Flavell',
        phoneNumber: '111 2222 444 44',
        type: 'outgoing',
        date: randomDate(minDate, maxDate, '12', '0'),
        missed: false
      }

    ];
  }

  ngOnInit() {
    // TODO: Open native call logs app
    // this.inAppBrowser.create('com.application.logs');
  }


}

function randomDate(start, end, startHour, endHour) {
  const date = new Date(+start + Math.random() * (end - start));
  const hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}
