import { transition, trigger, style, animate } from '@angular/animations';

/** Toggle filter menu in Admin Notification */

export const filterMenuAnimation = trigger('slideDown', [
  transition(':enter', [
    style({maxHeight: 0}),
    animate('300ms ease-in', style({maxHeight: '380px'}))
  ]),
  transition(':leave', [
    style({ overflow: 'hidden'}),
    animate('500ms ease-out', style({height: 0}))
  ])
]);

export const filterMenuListAnimation = trigger('slideListDown', [
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('300ms ease-in', style({transform: 'translateY(0)'}))
  ])
]);

/** Toggle Search input/Name order animation in Admin UserNav */

export const searchUserAnimation = trigger('toggleIn', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(-100%)'}),
    animate('200ms', style({opacity: 1, transform: 'translateY(0)'}))
  ]),
  transition(':leave', [
    style({opacity: 1, transform: 'translateY(0)'}),
    animate('200ms', style({opacity: 0, transform: 'translateY(100%)'}))
  ])
]);

