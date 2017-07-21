import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { errAnimation } from '../../animations/auth.animations';
import { Authenticate } from '../../models/user';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  animations: [errAnimation]
})
export class RegisterComponent implements OnInit {

  /** Display errors */
  showErrors = false;

  /** Register From */
  form: FormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      address: new FormControl('', Validators.required),
      gender: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
      password: new FormControl('', Validators.required),
      cPassword: new FormControl('', [
        Validators.required,
        (c) => this.matchingPasswords(c)]
      )
    }
  );

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    }
    this.form.enable();
  }

  @Output() submitted = new EventEmitter<Authenticate>();

  ngOnInit() {
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
      this.submitted.emit(this.form.value);
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
      required: 'ERR.NAME_REQUIRED'
    },
    surname: {
      required: 'ERR.SURNAME_REQUIRED',
    },
    email: {
      required: 'ERR.EMAIL_REQUIRED',
      email: 'ERR.EMAIL_VALID'
    },
    address: {
      required: 'ERR.ADDRESS_REQUIRED',
    },
    phone: {
      required: 'ERR.PHONE_NUMBER_REQUIRED',
      minlength: 'ERR.PHONE_NUMBER_LENGTH',
      maxlength: 'ERR.PHONE_NUMBER_LENGTH'
    },
    password: {
      required: 'ERR.PASSWORD_REQUIRED'
    },
    cPassword: {
      required: 'ERR.CPASSWORD_REQUIRED',
      notSame: 'ERR.PASSWORD_MATCH'
    }
  };

}

