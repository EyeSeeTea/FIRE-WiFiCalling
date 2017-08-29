import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { errAnimation } from '../../animations/auth.animations';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  animations: [errAnimation]
})
export class RegisterComponent implements OnInit, OnDestroy {

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
  sub: Subscription;

  @Output() register = new EventEmitter();

  ngOnInit() {
    this.sub = this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
      this.register.emit(this.form.value);
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
      required: 'FORMS.ERR.NAME_REQUIRED'
    },
    surname: {
      required: 'FORMS.ERR.SURNAME_REQUIRED',
    },
    email: {
      required: 'FORMS.ERR.EMAIL_REQUIRED',
      email: 'FORMS.ERR.EMAIL_VALID'
    },
    address: {
      required: 'FORMS.ERR.ADDRESS_REQUIRED',
    },
    phone: {
      required: 'FORMS.ERR.PHONE_NUMBER_REQUIRED',
      minlength: 'FORMS.ERR.PHONE_NUMBER_LENGTH',
      maxlength: 'FORMS.ERR.PHONE_NUMBER_LENGTH'
    },
    password: {
      required: 'FORMS.ERR.PASSWORD_REQUIRED'
    },
    cPassword: {
      required: 'FORMS.ERR.CPASSWORD_REQUIRED',
      notSame: 'FORMS.ERR.PASSWORD_MATCH'
    }
  };

}

