export interface AccountModel {
    type: string;
    name: string;
    oldName?: string;
    seller: string;
    marketPlace: string;
    token: string;
    domain: string;
}

export interface WarehouseModel {
    id: string;
    name: string;
    addressln1: string;
    addressln2: string;
    city: string;
    state: string;
    postal: number;
    country: string;
    countryCode: string;
    priority: number;
    isfba: number;
    isfbm: number;
    isvendor: number;
}
export interface BillingInfoModel {
    name: string;
    creditCardNumber: string;
    expirationDate: string;
    cvc: string;
    tenantId: number;
    userId: number;
}

export interface AddWalmartAccount {
    name: string,
    key: string,
    secret: string
}

