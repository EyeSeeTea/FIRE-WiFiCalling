import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { AppService } from '../../../store/app.service';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  animations: [
    trigger(
      'slideDown', [
        transition(':enter', [
          style({transform: 'translateY(-100%)'}),
          animate('200ms', style({transform: 'translateY(0)'}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)'}),
          animate('200ms', style({transform: 'translateY(-100%)'}))
        ])
      ]
    )
  ]
})
export class RegisterComponent implements OnInit {

  /** Display errors */
  showErrors = false;

  /** Register From */
  form: FormGroup;

  constructor(private builder: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.builder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        address: ['', Validators.required],
        gender: [''],
        phone: ['', [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)
        ]],
        password: ['', Validators.required],
        cPassword: ['', [Validators.required, (c) => this.matchingPasswords(c)]]
      }
    );

    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?) {

    if (!this.form) {
      return;
    }

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = [];
      const control = this.form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  matchingPasswords(control: AbstractControl): { [key: string]: boolean } {
    if (!control.value) return null;
    return control.value === this.form.get('password').value ? null : {notSame: true};
  }

  onSubmit() {

    if (this.form.valid) {
      this.appService.register(this.form.value);
    } else {
      this.showErrors = true;
    }
  }

  formErrors = {
    name: '',
    surname: '',
    email: '',
    address: '',
    phone: '',
    gender: '',
    password: '',
    cPassword: ''
  };

  validationMessages = {
    name: {
      required: 'Name is required.'
    },
    surname: {
      required: 'Surname is required.',
    },
    email: {
      required: 'Email is required.',
      email: 'Email is not valid'
    },
    address: {
      required: 'Address is required.',
    },
    phone: {
      required: 'Phone number is required',
      minlength: 'Phone number must be 10 digit',
      maxlength: 'Phone number must be 10 digit'
    },
    password: {
      required: 'Password is required.'
    },
    cPassword: {
      required: 'Repeat Password is required.',
      notSame: 'Passwords do not match.'
    }
  };

}

