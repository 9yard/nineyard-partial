export interface SkuModel {
    removing?: boolean; // optional
    skuId?: string;
    title?: string;
    asin?: string;
    fnSku?: string;
    qty?: number;
    total?: number;
    minPrice?: number;
    avgCost?: number;
    note?: string;
    image?: string;
    account?: string;
    isShiperr?: boolean;
    shipGoodType?: string;
    isOverSized?: string;
    remaining?: number;
    qprnt?: number;
    qprntUpdated?: boolean;
    oldQprnt?: number;
    toPrintTxt?: number;
    notUpdateQty?: boolean;
    tmpPrint?: number;
    added?: any;
}

export interface SplitBoxSkuRequestModel {
  box: number;
  toPrint: number;
  oldQty: number;
  summa: number;
  ship: string;
  sku: string;
  account: string;
  isOverszd: number;
  boxes: string[];
  qtys: number[];
}

export interface BoxSkuRequestModel {
  newBox: number;
  qty: number;
  ship: string;
  sku: string;
  account: string;
  isOverszd: number;
}

export interface SplitIntoBoxRequestModel {
  box: number;
  toPrint: number;
  oldQty: number;
  summa: number;
  ship: string;
  sku: string;
  account: string;
  isOverszd: number;
  boxes: string[];
  qtys: number[];
}

export interface UpdateSkuQtyRequestModel {
  qty: number;
  sku: string;
  account: string;
  isOverszd: number;
}

export interface UpdateBoxSkuQtyRequestModel {
  qty: number;
  oldQty: number;
  ship: any;
  box: any;
  sku: string;
  account: string;
  isOverszd: number;
}

export interface GetBoxesRequestModel {
  ship: string;
  account: string;
  isOverszd: number;
}

export interface DeleteBoxesRequestModel {
  sku: string;
  account: string;
  isOverszd: number;
}

export interface GetBoxesByFilterRequestModel {
  ship: string;
  account: string;
  isOverszd: number;
  loadtype: number;
  fromBox: number;
  toBox: number;
}

export interface BoxesByFilterModel {
  firstBox: number;
  secondBox: number;
  sku: string;
  fnSku: string;
  qty: number;
  printD: string;
  weight: number;
  account: string;
  ship: string;
  qprnt: number;
  shipped: boolean;
  Asin: string;
  asin: string;
  isOpenBox?: boolean;
}

export interface DeleteFromBoxRequestModel {
  skus: string[];
  ships: string[];
  accounts: string[];
  isOverszds: number[];
  oldBoxes: number[];
  qtys: number[];
}

export interface SwitchBoxRequestModel {
  skus: string[];
  ships: string[];
  accounts: string[];
  isOverszds: number[];
  oldBoxes: number[];
  newBoxes: number[];
  qtys: number[];
}

export interface UnpackBoxRequestModel {
  skus: string[];
  ships: string[];
  accounts: string[];
  isOverszds: number[];
  oldBoxes: number[];
  qtys: number[];
}

export interface BoxModel {
  removing?: boolean; // optional
  sku: string;
  isShiperr: boolean;
  qty: number;
  addBy: string;
  wh: string;
  bx: string;
  errDismissed?: boolean;
  remainQty?: number;
}

export interface SaveWeightRequestModel {
  weight: number;
  ship: string;
  box: number;
  account: string;
  isOverszd: number;
}

export interface ShipmentByFilterRequestModel {
  startDate: string;
  endDate: string;
  account: string;
  status: string[];
  pageNumber: number;
  rowsPerPage: number;
  search: string;
  alertOnly?: boolean;
  withBoxContentOnly?: boolean;
}

export interface ShipmentModel {
  shipmentId: string;
  name: string;
  account: string;
  status: string;
  destination: string;
  date: string;
  createdBy: string;
  isoverszd: number;
  pallets: number;
  created: string;
  isdone: boolean;
  wh: string;
  shipQty: number;
  recQty: number;
  skusQty: number;
  oversizeStatus: string;
  boxStatus: string;
  errDismissed?: boolean;
  boxCount: number;
}

export interface ShipmentByFilterModel {
  shipmentList: ShipmentModel[];
  shipmentCount: number;
}

export interface GetSkuLabelRequestModel {
  skus: string[];
  accounts: string[];
  qtys?: number[];
  isOverszds?: number[];
  notUpdateQty?: boolean;
}

export interface SkuLabelModel {
  amtArray: number[];
  amt: any;
  id: string;
  idType: string;
  title: string;
  isAmount: boolean;
}

export interface GetBoxLabelRequestModel {
  ship: string;
  account: string;
  isOverszd: number;
  fromBox: number;
  toBox: number;
  qty?: number;
}

export interface BoxLabelModel {
  box: number;
  assr: string;
  shipToName: string;
  shipToLine1: string;
  shipToLine2: string;
  shipFromName: string;
  shipFromLine1: string;
  shipFromLine2: string;
}

export interface CloseShipRequestModel {
  userId: number;
  tenantId: number;
  account: string;
  shipmentId: string;
}

export interface SendBoxContentRequestModel {
  userId: number;
  tenantId: number;
  account: string;
  shipmentId: string;
}

export interface PalletLabelRequestModel {
  userId: number;
  tenantId: number;
  account: string;
  shipmentId: string;
  amountToPrint: number;
  lableType: string;
}

export interface Skus {
  sku: string;
  qty: number;
}

export interface ShipModel {
  shipmentid: string;
  destinationId: string;
  shipTo: string;
  qty: number;
}

export interface PlanShipRequestModel {
  userId: number;
  tenantId: number;
  warehouseId: string;
  account: string;
  skus: Skus[];
  shipment: string;
}

export interface PlanShipModel {
  sku: string;
  ships: ShipModel[];
}

export interface GetSkuByNameRequestModel {
  sku: string;
  account: string;
}

export interface CreateShipRequestModel {
  userId: number;
  tenantId: number;
  account: string;
  warehouseId: string;
  isOverSized: number;
  skuShipments: SkuShipmentModel[];
}

export interface SkuShipmentModel {
  sku: string;
  shipments: Shipment[];
}

export interface Shipment {
  shipmentId: string;
  destination: string;
  qty: number;
}

export interface EditNoteRequestModel {
  note: string;
  sku: string;
  account: string;
}
export interface EditMinPriceRequestModel {
  minPrice: number;
  sku: string;
  account: string;
}
export interface BulkEditSkuRequestModel {
  minPrice: number;
  sku: string;
  account: string;
  note: string;
}
export interface SearchFnSkuRequestModel {
  account: string;
  isOverSized: number;
  fnSku: string;
}
export interface Fba {
  id: number;
  sku: string;
  title: string;
  asin: string;
  fnSku: string;
  brand: string;
  qty: number;
  total: number;
  account: string;
  image: string;
  note: string;
  working: number;
  active: boolean;
  reStockNote: string;
  isManual: boolean;
  bagSize: string;
  usern: string;
  perc: string;
  isFixed: boolean;
  isPrivateLabel: boolean;
  category: string;
  rank: number;
  isOverSized: number;
  isShiperr: boolean;
  shipGoodType: string;
  purchaseDays: number;
  minPrice: number;
  avgCost: number;
  markup: number;
  markupMin: boolean;
  shippr: number;
  isBag: boolean;
  estmFees: number;
  totalFees: number;
  isPrman: boolean;
  isPranMax: boolean;
  defaultPrice: number;
  costPr: number;
  minPr: number;
  maxPr: number;
  price: number;
  buyBox: number;
  bbIsPrime: boolean;
  bbIsAmzn: boolean;
  isBb: boolean;
  bbIsBeaten: boolean;
  bbUpdated: Date;
  isPron: boolean;
  prcFreeze: Date;
  isGroup: boolean;
  prModel: number;
  rePriced: Date;
  ovrStckLvl: number;
  isFba: boolean;
  bsnPrice: number;
  map: number;
  isMapOn: boolean;
  adGrp: number;
  advered: Date;
  advFreeze: Date;
  fbaWh: string;
}
export interface ScanBoxRequestModel {
  account: string;
  isOverSized: number;
  ship: string;
  box: number;
  sku: string[];
  qty: number[];
}

export interface RecountBoxNumberRequest {
  isOverszd: number;
  account: string;
  ship: string;
}
export interface ShipmentAddressModel {
  shipId?: string;
  fc?: string;
  shipTo?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zip?: string;
  county?: string;
  countryCode?: string;
  overszd?: string;
  shipFrom?: string;
}
