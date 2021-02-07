export interface SendToProductionRequestModel {
    sku: string;
    account: string;
    isOverszd: number;
    qty: number;
    addBy: string;
}

export interface MapValidateRequestModel {
    sku: string;
    itemId: string;
    qty: number;
}

export interface MapValidateResponseModel {
    sku: string;
    itemId: string;
    qty: number;
    title: string;
    image: string;
}

export interface ItemsBulkRequestModel {
    id: string;
    name: string;
    qty: number;
    vendorId: string;
    brand: string;
}

export interface SkuMappingRequestModel {
    sku: string;
    account: string;
    asin: string;
}

export interface MapModel {
    sku: string;
    itemId: string;
    qty: number;
    title: string;
    image: string;
    avgPrice: number;
}

export interface SeasonModel {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    isSelected: boolean;
}

export interface LocSkuSummaryModel {
    locationstring: string;
    asin: string;
    qty: number;
    last: Date;
    wh: string;
    inserted: Date;
}

export interface LocSkuModel {
    location: string;
    qty: number;
    datet: Date;
    usern: string;
    type: string;
    wh: string;
}

export interface DeductedModel {
    shipId: string;
    sku: string;
    item: string;
    curQty: number;
    qty: number;
    date: Date;
    usern: string;
}
export interface SkuCodesModel {
    sku: string;
    code: string;
    qty: number;
    type: string;
}

export interface SkuMappingModel {
    map: MapModel[];
    season: SeasonModel[];
    locSkuSummary: LocSkuSummaryModel[];
    locSku: LocSkuModel[];
    deducted: DeductedModel[];
    skuCodes: SkuCodesModel[];
}

export interface EditActiveRequestModel {
    account: string;
    active: boolean;
    sku: string;
}

export interface SkuByAccountModel {
    skuId: string;
    title: string;
    asin: string;
    fnSku: string;
    box: any;
    ship: any;
    qty: number;
    total: number;
    minPrice: number;
    avgCost: number;
    note: string;
    image: string;
    account: string;
    isShiperr: boolean;
    shipGoodType: string;
    isOverSized: number;
    remaining: any;
    qprnt: any;
    oversizeStatus: string;
    rank: number;
    category: string;
    bbIsamzn: boolean;
    buyBox: number;
    shipToFba: number;
}

export interface ProductListModel {
    archived: boolean;
    avgPrice: number;
    avgTemp: number;
    brand: any;
    caseq: number;
    enforce: number;
    fbmQty: number;
    height: number;
    id: string;
    iid: number;
    image: string;
    inboundQty: number;
    isDrp: boolean;
    itemGrp: number;
    length: number;
    missingQty: number;
    name: string;
    note: string;
    onShelfQty: number;
    outboundQty: number;
    price: number;
    qty: number;
    receivingQty: number;
    upc: any;
    vendid: string;
    vendor: string;
    weight: number;
    width: number;
    purchaseData: any[];
    sellingData: any[];
}
export interface ProductMappingListSubItem {
    item: string;
    qty: number;
}
export interface ProductMappingListItem {
    displayName: string;
    items: ProductMappingListSubItem[];
    skuCnt: number;
    item: string;
    qty: number;
    itemQtyMaps: string;
    channels: string;
}
export interface ProductPurchaseLineItem {
    iid: number;
    id: string;
    name: string;
    image?: any;
    qty: number;
    vendor: string;
    price: number;
    avgPrice: number;
    note: string;
    itemGrp: number;
    archived: boolean;
    avgTemp: number;
    fbmQty: number;
    isDrp: boolean;
    upc?: any;
    caseq: number;
    enforce: number;
    length?: any;
    height?: any;
    width?: any;
    weight?: any;
    vendid?: any;
    brand?: any;
    inboundQty: number;
    onShelfQty: number;
    isInKit: boolean;
}
