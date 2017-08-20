import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISettings } from '../../models/settings';

@Component({
  selector: 'settings-form',
  templateUrl: 'settings-form.component.html'
})
export class SettingsFormComponent {

  /** Settings data */
  @Input() settings: ISettings;

  /** Pending state */
  @Input() pending: boolean;

  /** Settings output */
  @Output() settingsChange = new EventEmitter<ISettings>();

  /** Submit new settings */
  onSubmit() {
    this.settingsChange.emit(this.settings);
  }

}

