import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { slideVerticalAnimation } from '../../../shared/animations/shared.animations';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  animations: [slideVerticalAnimation]
})

export class LoginComponent implements OnInit, OnDestroy {

  /** Display errors */
  showErrors = false;
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  sub: Subscription;

  @Output() login = new EventEmitter();

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

  onSubmit() {
    if (this.form.valid) {
      this.login.emit(this.form.value);
    } else {
      this.showErrors = true;
    }
  }

  formErrors = {
    username: '',
    password: '',
  };

  validationMessages = {
    username: {
      required: 'FORMS.ERR.USERNAME_REQUIRED'
    },
    password: {
      required: 'FORMS.ERR.PASSWORD_REQUIRED'
    },
  };

}
