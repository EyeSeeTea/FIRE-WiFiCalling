import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pricing } from '../../../models/billing';

@Component({
  selector: 'pricing-form',
  templateUrl: 'pricing-form.component.html'
})
export class PricingFormComponent {

  /** Selected country index */
  selectedIndex = 0;

  /** Exclude select input from the form */
  ngModelOption = {standalone: true};

  @Input() pricing: Pricing;

  /** Pending state (for getting pricing state) */
  @Input() pending: boolean;

  /** Pricing output */
  @Output() pricingChange = new EventEmitter<Pricing>();

  /** Submit new pricing */
  onSubmit() {
    this.pricingChange.emit(this.pricing);
  }

}

