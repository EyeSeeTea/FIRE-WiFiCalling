import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Pricing } from '../../../models/billing';

@Component({
  selector: 'pricing-form',
  templateUrl: 'pricing-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingFormComponent {

  /** Selected country index */
  countryIndex = 0;

  /** Pricing data */
  pricing: Pricing;
  originalPricing: Pricing;
  international;


  isFirst = true;

  // /** Pricing input */
  @Input('pricing')
  set setPricing(pricing: Pricing) {
    this.pricing = Object.assign({}, pricing);
    this.international = Object.assign([], this.pricing.international);

    if (this.isFirst) {
      // console.log('set pricing');
      this.originalPricing = Object.assign({}, pricing);
      this.isFirst = false;
    }
  }

  /** Pending state (getting pricing state) */
  @Input() pending: boolean;

  /** Pricing output */
  @Output() pricingChange = new EventEmitter<Pricing>();

  /** Submit new pricing */
  submitPricing() {
    this.pricingChange.emit(this.pricing);
  }

  interMobileChanged(index, value) {
    this.international[index].mobile = value;
    this.pricing = Object.assign({}, this.pricing, {international: Object.assign([], this.international)});
    console.log('interMobileChanged', this.international[index].mobile);
  }

  interLandLinesChanged(index, value) {
    this.international[index].landLines = value;
    this.pricing = Object.assign({}, this.pricing, {international: Object.assign([], this.international)});
    console.log('interLandChanged', this.pricing.international[index].landLines);
  }

  /** If pricing has changed show the save changes button  */
  pricingChanged() {
    const original = JSON.stringify(this.originalPricing);
    const modified = JSON.stringify(this.pricing);

    // if (this.international && this.international.length) {
    //
    //   console.log('compare', this.pricing.international[0].landLines, this.originalPricing.international[0].landLines);
    // }


    // return !this.pending && !equal(this.originalPricing, this.pricing);
    // return !this.pending && JSON.stringify(this.pricing) !== JSON.stringify(this.originalPricing);
    return !this.pending && original !== modified;
  }

}

