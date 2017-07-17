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
      required: 'ERR_NAME_REQUIRED'
    },
    surname: {
      required: 'ERR_SURNAME_REQUIRED',
    },
    email: {
      required: 'ERR_EMAIL_REQUIRED',
      email: 'ERR_EMAIL_VALID'
    },
    address: {
      required: 'ERR_ADDRESS_REQUIRED',
    },
    phone: {
      required: 'ERR_PHONE_NUMBER_REQUIRED',
      minlength: 'ERR_PHONE_NUMBER_LENGTH',
      maxlength: 'ERR_PHONE_NUMBER_LENGTH'
    },
    password: {
      required: 'ERR_PASSWORD_REQUIRED'
    },
    cPassword: {
      required: 'ERR_CPASSWORD_REQUIRED',
      notSame: 'ERR_PASSWORD_MATCH'
    }
  };

}

