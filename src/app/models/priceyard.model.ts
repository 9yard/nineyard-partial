export interface PricingModel {
    activeSkus: number;
    description: string;
    isActive: boolean;
    lastRun: string;
    modelId: number;
    name: string;
}

export interface RepriceSettings {
    modelId?: number;
    name: string;
    description: string;
    fba: RepriceModelSettings;
    fbm: RepriceModelSettings;
    isModelActive: boolean;
}

export interface RepriceModelSettings {
    percentOrDollar?: string;
    value: number;
    isAgressive?: boolean;
}

export interface RepriceListItem {
    modelId?: number;
    name: string;
    description: string;
    isActive: boolean;
    activeSkus: number;
    lastRun: string;
    marketPlace: "Walmart" | "Amazon";
}



export interface Model {
    name: string;
    description: string;
    offers: Offer[];
    isModelActive: boolean | string;
    modelId: number;
    marketplaceType: string;
  }
  
  export interface Offer {
    offerName: string;
    competitors: Competitor[];
  }
  
  export interface Competitor {
    competitorName: string;
    offerOptions: OfferOptions;
  }
  
  export interface OfferOptions {
    isAgressive: boolean;
    percentOrDollar: string;
    value: number;
  }
  