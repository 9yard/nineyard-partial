export interface PosModel {
    id: number;
    shipIsOther: boolean;
    completed: Date;
    inDate: Date;
    invoice: string;
    venderId: string;
    venderName: string;
    submitted: Date;
    status: string;
    itemCount: number;
    sumQty: number;
    qty: number;
    price: number;
    priceTotal: number;
    ship: number;
    discount: number;
    other: number;
    poTotal: number;
}

export interface PoDetailModel {
    id: number;
    shipIsOther: boolean;
    venderSId: number;
    venderId: string;
    venderName: string;
    venderAddress: string;
    venderPhone: string;
    venderPhone2: string;
    submitted: Date;
    completed: Date;
    status: string;
    note: string;
    invoice: string;
    inDate: Date;
    est: Date;
    ship: number;
    discount: number;
    other: number;
    itemId: string;
    itemName: string;
    itemVenderId: string;
    qty: number;
    bfr: string;
    price: number;
    rec: number;
    total: number;
}

export interface NewPoRequestModel {
    id: number;
    vender: number;
    submitted: string;
    note: string;
    status: string;
    completed: string;
    done: boolean;
    invoice: string;
    inDate: string;
    ship: number;
    discount: number;
    other: number;
    exported: boolean;
    shipIsOther: boolean;
    est: string;
    items: ItemsOfPo[];
}

export interface ItemsOfPo {
    id: string;
    qty: number;
    price: number;
}

export interface EditPoRequestModel {
    id: number;
    submitted: string;
    note: string;
    completed: string;
    invoice: string;
    inDate: string;
    items: ItemsOfPo[];
}

export interface ItemModel {
    itemId: number;
    id: string;
    name: string;
    image: string;
    qty: number;
    vendor: string;
    price: number;
    avgPrice: number;
    note: any;
    itemGrp: number;
    archived: boolean;
    avgTemp: number;
    fbmQty: number;
    isDrp: boolean;
    upc: any;
    caseQ: number;
    enforce: number;
    length: number;
    height: number;
    width: number;
    weight: number;
    vendId: string;
    brand: any;
    inbound: any;
    lQty: any;
    onShelf: any;
    missing: any;
    codes: any;
    itemsId: any;
}

export interface VenderModel {
    sid: number;
    id: string;
    name: string;
    address: string;
    phone: string;
    phone2: string;
    email: string;
    shipAvg: number;
    on1: number;
    on2: number;
    on3: number;
    on4: number;
    leadDays: number;
    purchaseDays: number;
    leadOn: true;
    purchaseAmnt: number;
    vendId: any;
    isManuFact: boolean;
    manufDays: number;
    ma1: number;
    ma2: number;
    ma3: number;
    ma4: number;
}
