export interface GetOpenShipModel {
    shipId: string;
    account: string;
    destCode: string;
    wh: string;
    sku: number;
    box: number;
    lastPlan: Date;
}

export interface ShipmentDiscrepancy {
    sku: string;
    image: string;
    discrepancy: number;
    shipped: number;
    recieved: number;
}

export interface HomePageShipmentData {
    activeSkus: number;
    qtyInProduction: number;
    shipmentDiscrepancyQty: number;
    unitsNotReceived: number;
    avgQtyPerShipment: number;
    unitsShipped: number;
    shipCount: number;
    shipmentDiscrepancies: ShipmentDiscrepancy[];
}
