import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { AppService } from '../../store/app.service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  showErrors = false;
  active = false;
  form: FormGroup;

  constructor(public navCtrl: NavController,
              private builder: FormBuilder,
              private appService: AppService) {
  }

  ionViewDidLoad() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.builder.group({
        username: [
          '', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10)
          ]
        ],
        email: [
          '', [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
          '', [Validators.required]
        ],
        cPassword: [
          '', [Validators.required, (c) => this.matchingPasswords(c)]
        ],
        acceptRules: [
          false, [Validators.requiredTrue]
        ]
      }
    );

    this.active = true;

    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?) {

    if (!this.form) {
      return;
    }

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = this.form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
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

  login() {
    this.navCtrl.setRoot('LoginPage');
  }

  formErrors = {
    username: '',
    email: '',
    password: '',
    cPassword: '',
    acceptRules: ''
  };

  validationMessages = {
    username: {
      required: 'Username is required.',
      minlength: 'Username must be at least 4 characters long.',
      maxlength: 'Username cannot be more than 10 characters long.',
    },
    email: {
      required: 'Email is required.',
      email: 'Email is not valid'
    },
    password: {
      required: 'Password is required.'
    },
    cPassword: {
      required: 'Confirm Password is required.',
      notSame: 'Passwords do not match.'
    },
    acceptRules: {
      requiredTrue: 'You must acceptRules the rules to register.'
    }
  };

}

