import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Contacts, IContactProperties, IContactFindOptions } from '@ionic-native/contacts';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import { AuthGuard } from '../../auth/guard/auth-guard';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsPage extends AuthGuard implements OnInit, OnDestroy {

  /** Filter contacts with name or phone number */
  filterKey = new BehaviorSubject('');

  /** Contact list */
  list = new Subject<IContactProperties[]>();

  constructor(public contacts: Contacts, public store: Store<any>) {
    super(store);
  }

  ngOnInit() {

    this.filterKey.subscribe((key: string) => {

      const filterOptions: IContactFindOptions = {
        multiple: true,
        hasPhoneNumber: true,
        desiredFields: ['displayName', 'phoneNumbers', 'photos'],
        filter: key
      };
      return this.contacts.find(['displayName', 'phoneNumbers'], filterOptions)
        .then((contacts: IContactProperties[]) => this.list.next(contacts))
        .catch(err => this.list.next(mockList));
    });
  }

  ngOnDestroy() {
    this.filterKey.unsubscribe();
  }
}

const mockList = [
  {
    displayName: 'Jamee Seals',
    phoneNumber: ['[111 2222 333 45']
  },
  {
    displayName: 'Coreen Boomer',
    phoneNumber: ['111 7777 333 45']
  },
  {
    displayName: 'Ruben Gangi',
    phoneNumber: ['222 2222 333 45']
  },
  {
    displayName: 'Carlos',
    phoneNumber: ['111 2222 444 44'],
  },
  {
    displayName: 'Vasiliki Mccall',
    phoneNumber: ['111 2222 444 44']
  },
  {
    displayName: 'Donny Flavell',
    phoneNumber: ['111 2222 444 44']
  }
];
