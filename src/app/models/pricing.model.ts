export interface ListPricingRequestModel {
    account: string;
    search?: string;
    isActive: boolean;
    inStockOnly: boolean;
    pageNumber: number;
    rowsPerPage: number;
}

export interface SelectPricingRequestModel {
    account: string;
    sku: string;
    asin: string;
}

export interface ListPricingModel {
    sku: string;
    asin: string;
    total: number;
    ordLast30: number;
    image: string;
    costPr: number;
    minPr: number;
    maxPr: number;
    prModel: number;
    isPrman: boolean;
    isPrmanmx: boolean;
    isPron: boolean;
    isBag: boolean;
    isBb: boolean;
    bba: number;
    bbm: number;
    bbIsAmzn: boolean;
    fbaOff: number;
    fbmOff: number;
    price: number;
    lowestPrc: number;
    reviews: number;
    psTv: number;
    bbUpdated: Date;
    rePriced: Date;
    buyBox: number;
    minIsCost: boolean;
    bbIsPrime: boolean;
    mdName: string;
    ovrStckLvl: number;
    map: number;
    isMapOn: boolean;
    prcFreeze: Date;
    frzd: boolean;
    checked?: boolean;
    note?: string;
}

export interface SelectPricingModel {
    breakDown: BreakDownModel;
    seller: SellerModel;
    history: HistoryModel;
}

export interface BreakDownModel {
    price: number;
    avgCost: number;
    isPrivateLabel: boolean;
    fbaShip: number;
    stick: number;
    bag: number;
    ship: number;
    markupAmnt: number;
    markup: number;
    markupMin: number;
    Estm: number;
    total: number;
    minPr: number;
    estm: any;
}

export interface SellerModel {
    name: string;
    price: number;
    bb: boolean;
    review: number;
    positive: number;
    fba: boolean;
    prime: boolean;
}

export interface HistoryModel {
    sku: string;
    date: Date;
    newPrice: number;
    oldPrice: number;
    note: string;
}

export interface RefSellerModel {
    seller: string;
    name: string;
    ignored: boolean;
    ignoreBb: boolean;
    comp: number;
    win: number;
}

export interface SelectSellerModel {
    sku: string;
    asin: string;
    repriced: string;
    isPron: boolean;
}

export interface RefPricingHistoryRequestModel {
    isBetween: boolean;
    fromDate: Date;
    toDate: Date;
    note: string;
    sku: string;
    pageNumber: number;
    rowsPerPage: number;
}

export interface NewMapPriceScheduleModel {
    name: string;
    type: number;
    wdays: string;
    timeFrom: string;
    timeTo: string;
    ignore: boolean;
    ignHide: boolean;
    ison: boolean;
}

export interface RefPricingHistoryModel {
    date: Date;
    sku: string;
    account: string;
    newPrice: number;
    oldPrice: number;
    model: number;
    note: string;
    feedId: string;
    status: string;
    overStocked: boolean;
    name: string;
    asin: string;
}

export interface PrcModels {
    id?: number;
    name?: string;
    fvf?: any;
    fvfIf?: boolean;
    fvm?: number;
    fvmIf?: boolean;
    fva?: number;
    fvaIf?: boolean;
    mvf?: number;
    mvfIf?: boolean;
    mvm?: number;
    mvmIf?: boolean;
    mva?: number;
    mvaIf?: boolean;
    mvmYf?: number;
    mvmYfIf?: boolean;
    noBb?: number;
    minutes?: number;
    last?: number;
    ison?: boolean;
    minIsCost?: boolean;
    isCostDefault?: boolean;
    underMin?: boolean;
    isOverStocked?: boolean;
    isCostDefault90?: boolean;
    isCostDefault180?: boolean;
    cos180?: number;
    cos180If?: boolean;
    isCostDefault365?: boolean;
    cos365?: number;
    cos365If?: boolean;
    isBsn?: boolean;
    isShipsLater?: boolean;
    bsnPrc?: number;
    bsnIf?: boolean;
    bsnMin?: number;
    bsnMinIf?: boolean;
    bsnMax?: number;
    bsnMaxIf?: boolean;
    bsn1?: number;
    bsn1Qt?: number;
    bsn1If?: boolean;
    bsn2?: number;
    bsn2Qt?: number;
    bsn2If?: boolean;
    bsn3?: number;
    bsn3Qt?: number;
    bsn3If?: boolean;
    bsn4?: number;
    bsn4Qt?: number;
    bsn4If?: boolean;
    bsn5?: number;
    bsn5Qt?: number;
    bsn5If?: boolean;
    lowVelDay?: number;
    bbVsMax?: boolean;
    mVsAdFlt?: boolean;
    minVsAdFlt?: boolean;
    hideMap?: boolean;
    getBb?: boolean;
    sfpIsa?: boolean;
    getBball?: boolean;
    ovrIgn?: number;
    sfpIsBb?: boolean;
    tmpHd?: boolean;
    tmpMp?: boolean;
    costIf?: any;
    remainday?: any;
}