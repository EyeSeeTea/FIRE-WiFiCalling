import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { errAnimation } from '../../animations/auth.animations';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  animations: [errAnimation]
})

export class LoginComponent implements OnInit {

  /** Display errors */
  showErrors = false;
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  @Output() submitted = new EventEmitter();

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

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
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
      required: 'ERR.USERNAME_REQUIRED'
    },
    password: {
      required: 'ERR.PASSWORD_REQUIRED'
    },
  };

}
