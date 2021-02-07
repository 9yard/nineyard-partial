export interface ReplenishModel {
    sku: string;
    asin: string;
    image: string;
    price: number;
    working: number;
    total: number;
    fnSku: string;
    account: string;
    ordLast30: number;
    ordLast60: number;
    ordLast90: number;
    ordLast180: number;
    ordLast360: number;
    ord7: number;
    ord15: number;
    ord21: number;
    ord30: number;
    ords30: number;
    velocity2: number;
    velocity7: number;
    velocity14: number;
    velocity30: number;
    date30: Date;
    dif30: number;
    local: number;
    dupAsin: number;
    dupItem: number;
    ooSperc: number;
    velocity: number;
    toVelocity: number;
    ssnAdj: string;
    fm2: string;
    reStock: number;
    remaining: string;
    avgCost: number;
    inWare: number;
    inWareThis: string;
    inWareThisBox: string;
    minP: number;
    bb: number;
    isp: number;
    isa: number;
    isb: number;
    note: string;
    category: string;
    rank: string;
    isOverSized: number;
    isShiperr: boolean;
    shipGoodType: string;
    isPrivateLabel: boolean;
}

export interface SelectRestInWhRequestModel {
    sku: string;
    account: string;
    asin: string;
}

export interface DupSkuModel {
    sku: string;
    asin: string;
    reStock: number;
    remaining: string;
    image: string;
}
export interface SelectRestordRequestModel {
    sku: string;
    account: string;
    asin: string;
}
export interface RestInWhsModel {
    sku: string;
    qty: number;
    picked: number;
    wh: string;
}

export interface RestStockModel {
    id: string;
    qty: number;
    onShelf: number;
}

export interface RestOrdsModel {
    date: Date;
    qt: number;
    underMin: number;
    qty: number;
}

export interface RestOrdModel {
    restOrds: RestOrdsModel[];
    restOrdsCount: RestOrdsCountModel;
}

export interface RestOrdsCountModel {
    days: number;
    total: any;
}

export interface SelectRestInWhModel {
    restInWhs: RestInWhsModel[];
    restInWhCount: number;
    restOrd: RestOrdModel;
    restStocks: RestStockModel[];
}

export interface SelectRestordModel {
    restOrd: RestOrdModel;
    restStocks: RestStockModel[];
}
