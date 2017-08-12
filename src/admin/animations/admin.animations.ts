import { transition, trigger, style, animate } from '@angular/animations';

/** Toggle filter menu in Admin Notification */

export const filterMenuAnimation = trigger('slideDown', [
  transition(':enter', [
    style({opacity: 0, maxHeight: 0 }),
    animate('200ms ease-in', style({opacity: 1, maxHeight: '380px'}))
  ]),
  transition(':leave', [
    style({opacity: 1}),
    animate('200ms ease-out', style({opacity: 0, maxHeight: 0}))
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

