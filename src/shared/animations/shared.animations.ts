import { transition, trigger, style, animate } from '@angular/animations';

/** Form validation errors animation */

export const slideVerticalAnimation = trigger('slideVertical', [
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('200ms', style({transform: 'translateY(0)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateY(0)'}),
    animate('200ms', style({transform: 'translateY(-100%)'}))
  ])
]);

/** Tabs animations */

/** Slide right to left */
export const slideRTLAnimation = trigger('slideRTL', [
  transition(':enter', [
    style({transform: 'translateX(100%)'}),
    animate('300ms', style({transform: 'translateX(0)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)'}),
    animate('300ms', style({transform: 'translateX(100%)'}))
  ])
]);

/** Slide left to right */
export const slideLTRAnimation = trigger('slideLTR', [
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate('300ms', style({transform: 'translateX(0%)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)'}),
    animate('300ms', style({transform: 'translateX(-100%)'}))
  ])
]);
