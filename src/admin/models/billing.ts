export interface Pricing {
  localMobile?: string;
  localLandLines?: string;
  nationalMobile?: string;
  nationalLandLines?: string;
  international?: Country[];
}

export interface Country {
  country: string;
  mobile: string;
  landLines: string;
}

