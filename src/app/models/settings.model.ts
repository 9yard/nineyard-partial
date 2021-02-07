export interface SettingAccount {
    name: string;
    seller: string;
    marketPlace: string;
    token: string;
    accessKey: string;
    secretkey: string;
    domain: string;
    addressln1: string;
    addressln2: string;
    city: string;
    state: string;
    postal: number;
    country: string;
}

export interface SettingVendor {
    name: string;
    id: string;
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
    picktp: any;
    ispicking: boolean;
    isfbmenonly: boolean;
}
