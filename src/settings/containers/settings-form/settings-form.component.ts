import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../auth/models/user';
import { NavController } from "ionic-angular";

@Component({
  selector: 'settings-form',
  templateUrl: 'settings-form.component.html'
})
export class SettingsFormComponent {

  /** Settings data */
  @Input() user: User;

  /** User logged in state */
  @Input() loggedIn: boolean;

  /** Settings output */
  @Output() settingsChange = new EventEmitter<User>();

  /** Submit new settings */
  onSubmit() {
    this.settingsChange.emit(this.user);
  }

  constructor(private navCtrl: NavController) {
  }

  redirectToAuthPage() {
    this.navCtrl.setRoot('AuthPage');
  }
}

