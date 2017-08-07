import { transition, trigger, style, animate } from '@angular/animations';

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
