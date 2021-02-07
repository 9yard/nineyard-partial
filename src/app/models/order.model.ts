export interface ListOrdersRequestModel {
    startDate: string;
    endDate: string;
    isPending: boolean;
    isCancelled: boolean;
    isShipped: boolean;
    account: string;
    sku: string;
    asin: string;
    pageNumber: number;
    rowsPerPage: number;
}

export interface ListOrderModel {
    orderId: string;
    purchased: Date;
    updated: Date;
    status: string;
    sku: string;
    asin: string;
    qty: number;
    currency: string;
    price: number;
    tax: string;
    shipping: string;
    sTax: string;
    gift: string;
    gTax: string;
    discount: string;
    sDiscount: string;
    account: string;
    timeadj: string;
    channel: string;
    shipByMerch: boolean;
    isBsns: boolean;
    image: string;
}

export interface ListReturnsRequestModel {
    startDate: string;
    endDate: string;
    isPending: boolean;
    isCancelled: boolean;
    isShipped: boolean;
    account: string;
    sku: string;
    asin: string;
    pageNumber: number;
    rowsPerPage: number;
}

export interface ListReturnModel {
    date: Date;
    ordId: string;
    sku: string;
    asin: string;
    qty: number;
    diPosition: string;
    status: string;
    comment: string;
    reason: string;
    license: string;
    fc: string;
    account: string;
    image: string;
}

export interface ListRemovalsRequestModel {
    startDate: string;
    endDate: string;
    isPending: boolean;
    isCancelled: boolean;
    isShipped: boolean;
    account: string;
    sku: string;
    asin: string;
    pageNumber: number;
    rowsPerPage: number;
}

export interface ListRemovalModel {
    ordId: string;
    reqDate: string;
    lastUpdate: string;
    sku: string;
    fnSku: string;
    diPosition: string;
    type: string;
    status: string;
    reqQty: number;
    canQty: number;
    disQty: number;
    shipQty: number;
    procQty: number;
    account: string;
    rec: number;
    image: string;
}

export interface OrderSettlmentModel {
    settlementId: string;
    transtype: string;
    ordId: string;
    mercordid: string;
    adjId: string;
    shipId: string;
    marketPlace: string;
    amountType: string;
    amountDesc: string;
    amount: number;
    fulfillment: string;
    postedD: string;
    postedDt: string;
    ordItem: string;
    merchordItem: string;
    merchadjItem: string;
    sku: string;
    qty: string;
    promoId: string;
}
