import { transition, trigger, style, animate } from '@angular/animations';

export const errAnimation = trigger('slideDown', [
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('200ms', style({transform: 'translateY(0)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateY(0)'}),
    animate('200ms', style({transform: 'translateY(-100%)'}))
  ])
]);

export const registerAnimation = trigger(
  'slideRegister', [
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('300ms', style({transform: 'translateX(0)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0)'}),
      animate('300ms', style({transform: 'translateX(100%)'}))
    ])
  ]
);

export const loginAnimation = trigger(
  'slideLogin', [
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('300ms', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0)'}),
      animate('300ms', style({transform: 'translateX(-100%)'}))
    ])
  ]);