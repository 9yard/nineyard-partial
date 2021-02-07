export interface ShipmentDetail {
  account: string;
  amazonShipmentId: string;
  boxes: ShipmentBox[];
  shipmentHeaderId: number;
  skus: ShipmentSku[];
  status: string;
  shipmentType: string;
}

export interface ShipmentBox {
  boxId: number;
  boxNumber: number;
  isLabelPrinted: boolean;
  skus: ShipmentSku[];
}

export interface ShipmentSku {
  account: string;
  asin: string;
  imageUrl: string;
  qty: number;
  sku: string;
  title: string;
  totalBoxed: number;
  printedCount: number;
  shipmentErrors: {
    addedOn: string;
    errorMessage: string;
  }[];
}

export interface EditShipmentSkuRequest {
  skus: {
    sku: string;
    qty: number;
  }[];
  shipmentHeaderId: number;
  appendQty: boolean;
}

export interface AddSkuToBoxRequest {
  sku?: string;
  shipmentHeaderId: number;
  boxQty: {
    boxId?: number;
    qty: number;
  }[];
}

export interface AddToExistingBox {
  sku: string;
  boxId: number;
  qty: number;
}

export interface ShipmentPlan {
  shi: any;
  dateCreated: string;
  destinationId: string;
  isRandomSku: boolean;
  qty: number;
  shipTo: string;
  shipmentId: string;
  shipmentPlanHeaderId: number;
  shipmentPlanId: number;
  sku: number;
}
