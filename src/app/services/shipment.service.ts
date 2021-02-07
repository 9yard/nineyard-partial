import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import {
  SplitIntoBoxRequestModel,
  SwitchBoxRequestModel,
  UnpackBoxRequestModel,
  DeleteFromBoxRequestModel,
  GetBoxesByFilterRequestModel,
  GetBoxesRequestModel,
  UpdateSkuQtyRequestModel,
  BoxSkuRequestModel,
  SplitBoxSkuRequestModel,
  DeleteBoxesRequestModel,
  SaveWeightRequestModel,
  ShipmentByFilterRequestModel,
  GetSkuLabelRequestModel,
  GetBoxLabelRequestModel,
  CloseShipRequestModel,
  PalletLabelRequestModel,
  PlanShipRequestModel,
  GetSkuByNameRequestModel,
  CreateShipRequestModel,
  SendBoxContentRequestModel,
  EditNoteRequestModel,
  SearchFnSkuRequestModel,
  ScanBoxRequestModel,
  EditMinPriceRequestModel,
  BulkEditSkuRequestModel,
  UpdateBoxSkuQtyRequestModel,
  RecountBoxNumberRequest,
  ShipmentModel,
} from "../models/shipment.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShipmentService {
  private url = "api/shipment";

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };

  constructor(private http: HttpClient) {}

  public GetShipIdsByFilter(acc: string, type: number) {
    const data = JSON.stringify({ account: acc, isOverszd: type });
    return this.http.post(
      `/${this.url}/getshipidsbyfilter`,
      data,
      this.options
    );
  }

  public GetShipIdsWhByFilter(acc: string, type: number) {
    const data = JSON.stringify({ account: acc, isOverszd: type });
    return this.http.post(
      `/${this.url}/getshipidswhbyfilter`,
      data,
      this.options
    );
  }

  public RemoveShipmentId(shipmentId: string, acc: string, type: number) {
    const data = JSON.stringify({
      shipId: shipmentId,
      account: acc,
      isOverszd: type,
    });
    return this.http.post(`/${this.url}/RemoveShipmentId`, data, this.options);
  }

  public GetShipIdsDestCodeByFilter(
    acc: string,
    type: number,
    status: string[] = []
  ) {
    const data = JSON.stringify({ account: acc, isOverszd: type, status });
    return this.http.post(
      `/${this.url}/getshipIdsdestcodebyfilter`,
      data,
      this.options
    );
  }

  public GetWorkingShipIdsDestCodeByFilter(acc: string, type: number = null) {
    const data = JSON.stringify({ account: acc, isOverszd: type });
    return this.http.post(
      `/${this.url}/getworkingshipIdsdestcodebyfilter`,
      data,
      this.options
    );
  }

  public GetShipmentById(id: string) {
    return this.http.get(`/${this.url}/shipmentbyid/${id}`, this.options);
  }

  public ShipmentByShipId(id: string) {
    return this.http.get(`/${this.url}/shipmentbyshipid/${id}`, this.options);
  }

  public GetWhList() {
    return this.http.get(`/${this.url}/whlist`, this.options);
  }

  public UpdateShipmentWh(shipment: any) {
    const data = JSON.stringify({
      ship: shipment.shipmentId,
      wh: shipment.wh,
      isOverszd: shipment.isoverszd,
    });
    return this.http.post(`/${this.url}/updateshipmentwh`, data, this.options);
  }

  public addToProduction(shipment: any) {
    const data = JSON.stringify({
      ship: shipment.shipmentId,
      wh: shipment.wh,
      isOverszd: shipment.isoverszd,
      account: shipment.account,
    });
    return this.http.post(`/${this.url}/addtoproduction`, data, this.options);
  }

  public GetSkuByFilter(acc: string, type: number) {
    const data = JSON.stringify({ account: acc, isOverszd: type });
    return this.http.post(`/${this.url}/getskubyfilter`, data, this.options);
  }

  public GetSkuCountByType(acc: string) {
    return this.http.get(
      `/${this.url}/getskucountbytype?account=${acc}`,
      this.options
    );
  }

  public GetAllSkus(type: number) {
    const data = JSON.stringify({ isOverszd: type });
    return this.http.post(`/${this.url}/getallskus`, data, this.options);
  }

  public RemoveSkuByFilter(acc: string, type: number) {
    const data = JSON.stringify({ account: acc, isOverszd: type });
    return this.http.post(`/${this.url}/removeskubyfilter`, data, this.options);
  }

  public SplitBoxSku(splitBoxSkuRequestModel: SplitBoxSkuRequestModel) {
    const data = JSON.stringify(splitBoxSkuRequestModel);
    return this.http.post(`/${this.url}/splitboxsku`, data, this.options);
  }

  public BoxSku(boxSkuRequestModel: BoxSkuRequestModel) {
    const data = JSON.stringify(boxSkuRequestModel);
    return this.http.post(`/${this.url}/boxsku`, data, this.options);
  }

  public DeleteTopAckSku(deleteBoxesRequestModel: DeleteBoxesRequestModel) {
    const data = JSON.stringify(deleteBoxesRequestModel);
    return this.http.post(`/${this.url}/deletetopacksku`, data, this.options);
  }

  public UpdateSkuQty(updateSkuQtyRequestModel: UpdateSkuQtyRequestModel) {
    const data = JSON.stringify(updateSkuQtyRequestModel);
    return this.http.put(`/${this.url}/updateskuqty`, data, this.options);
  }

  public UpdateBox(updateSkuQtyRequestModel: UpdateSkuQtyRequestModel) {
    const data = JSON.stringify(updateSkuQtyRequestModel);
    return this.http.put(`/${this.url}/updatebox`, data, this.options);
  }

  public UpdateBoxSkuQty(
    updateBoxSkuQtyRequestModel: UpdateBoxSkuQtyRequestModel
  ) {
    const data = JSON.stringify(updateBoxSkuQtyRequestModel);
    return this.http.put(`/${this.url}/updateboxskuqty`, data, this.options);
  }

  public RemoveFromProduction(shipmentId: string) {
    return this.http.post(
      `/${this.url}/removefromproduction`,
      { shipmentId },
      this.options
    );
  }

  public GetListBoxes(getBoxesRequestModel: GetBoxesRequestModel) {
    const data = JSON.stringify(getBoxesRequestModel);
    return this.http.post(`/${this.url}/getlistboxes`, data, this.options);
  }

  public GetBoxSum(getBoxesRequestModel: GetBoxesRequestModel) {
    const data = JSON.stringify(getBoxesRequestModel);
    return this.http.post(`/${this.url}/getboxsum`, data, this.options);
  }

  public GetBoxesByFilter(
    getBoxesByFilterRequestModel: GetBoxesByFilterRequestModel
  ) {
    const data = JSON.stringify(getBoxesByFilterRequestModel);
    return this.http.post(`/${this.url}/getboxesbyfilter`, data, this.options);
  }

  public DeleteFromBox(deleteFromBoxRequestModel: DeleteFromBoxRequestModel) {
    const data = JSON.stringify(deleteFromBoxRequestModel);
    return this.http.post(`/${this.url}/deletefrombox`, data, this.options);
  }

  public SplitIntoBox(splitIntoBoxRequestModel: SplitIntoBoxRequestModel) {
    const data = JSON.stringify(splitIntoBoxRequestModel);
    return this.http.post(`/${this.url}/splitintobox`, data, this.options);
  }

  public SwitchBox(switchBoxRequestModel: SwitchBoxRequestModel) {
    const data = JSON.stringify(switchBoxRequestModel);
    return this.http.post(`/${this.url}/switchbox`, data, this.options);
  }

  public UnpackBox(unpackBoxRequestModel: UnpackBoxRequestModel) {
    const data = JSON.stringify(unpackBoxRequestModel);
    return this.http.post(`/${this.url}/unpackbox`, data, this.options);
  }

  public SaveWeight(saveWeightRequestModel: SaveWeightRequestModel) {
    const data = JSON.stringify(saveWeightRequestModel);
    return this.http.post(`/${this.url}/saveweight`, data, this.options);
  }

  public ShipmentByFilter(
    shipmentByFilterRequestModel: ShipmentByFilterRequestModel
  ) {
    const data = JSON.stringify(shipmentByFilterRequestModel);
    return this.http.post(`/${this.url}/shipmentbyfilter`, data, this.options);
  }

  public ShipmentById(shipmentId: number): Observable<ShipmentModel> {
    return this.http.get<ShipmentModel>(
      `/${this.url}/shipmentbyid/${shipmentId}`,
      this.options
    );
  }

  public DismissShipmentError(shipmentId: string) {
    return this.http.put(
      `/${this.url}/dismissshipmenterror?shipmentId=${shipmentId}`,
      this.options
    );
  }

  public DismissShipmentSkuError(shipmentId: string, sku: string) {
    return this.http.put(
      `/${this.url}/dismissshipmentskuerror?shipmentId=${shipmentId}&sku=${sku}`,
      this.options
    );
  }

  public EnableShipmentError(shipmentId: string) {
    return this.http.put(
      `/${this.url}/enableshipmenterror?shipmentId=${shipmentId}`,
      this.options
    );
  }

  public ImportBoxes(data: FormData) {
    return this.http.post(`/${this.url}/importboxes`, data);
  }

  public GetSkuLabel(getSkuLabelRequestModel: GetSkuLabelRequestModel) {
    const data = JSON.stringify(getSkuLabelRequestModel);
    return this.http.post(`/${this.url}/getskulabel`, data, this.options);
  }

  public GetSkuLabelNew(getSkuLabelRequestModel: GetSkuLabelRequestModel) {
    const data = JSON.stringify(getSkuLabelRequestModel);
    return this.http.post(`/${this.url}/getskulabelnew`, data, {
      headers: this.headers,
      observe: "response",
      responseType: "blob",
    });
  }

  public GetBoxLabel(getBoxLabelRequestModel: GetBoxLabelRequestModel) {
    const data = JSON.stringify(getBoxLabelRequestModel);
    return this.http.post(`/${this.url}/getboxlabel`, data, this.options);
  }

  public GetBoxLabelNew(getBoxLabelRequestModel: GetBoxLabelRequestModel) {
    const data = JSON.stringify(getBoxLabelRequestModel);
    return this.http.post(`/${this.url}/getboxlabelnew`, data, {
      headers: this.headers,
      observe: "response",
      responseType: "blob",
    });
  }

  public GetBoxLabel2D(getBoxLabelRequestModel: GetBoxLabelRequestModel) {
    const data = JSON.stringify(getBoxLabelRequestModel);
    return this.http.post(`/${this.url}/getboxlabel2d`, data, {
      headers: this.headers,
      observe: "response",
      responseType: "blob",
    });
  }

  public CloseShip(closeShipRequestModel: CloseShipRequestModel) {
    const data = JSON.stringify(closeShipRequestModel);
    return this.http.post(`/${this.url}/closeship`, data, {
      headers: this.headers,
      responseType: "text",
    });
  }

  public SendBoxContent(
    sendBoxContentRequestModel: SendBoxContentRequestModel
  ) {
    const data = JSON.stringify(sendBoxContentRequestModel);
    return this.http.post(`/${this.url}/sendboxcontent`, data, {
      headers: this.headers,
      responseType: "text",
    });
  }

  public PalletLabel(palletLabelRequestModel: PalletLabelRequestModel) {
    const data = JSON.stringify(palletLabelRequestModel);
    return this.http.post(`/${this.url}/palletlabel`, data, {
      headers: this.headers,
      observe: "response",
      responseType: "blob",
    });
  }

  public PlanShip(planShipRequestModel: PlanShipRequestModel) {
    const data = JSON.stringify(planShipRequestModel);
    return this.http.post(`/${this.url}/planship`, data, this.options);
  }
  public PlanShipForAll(planShipRequestModel: PlanShipRequestModel) {
    const data = JSON.stringify(planShipRequestModel);
    return this.http.post(`/${this.url}/planmultiship`, data, this.options);
  }

  public GetSkuByName(getSkuByNameRequestModel: GetSkuByNameRequestModel) {
    const data = JSON.stringify(getSkuByNameRequestModel);
    return this.http.post(`/${this.url}/getskubyname`, data, this.options);
  }

  public CreateShip(createShipRequestModel: CreateShipRequestModel) {
    const data = JSON.stringify(createShipRequestModel);
    return this.http.post(`/${this.url}/createship`, data, {
      headers: this.headers,
      responseType: "text",
    });
  }

  public EditNote(editNoteRequestModel: EditNoteRequestModel) {
    const data = JSON.stringify(editNoteRequestModel);
    return this.http.post(`/${this.url}/editnote`, data, this.options);
  }

  public EditMinPrice(editMinPriceRequestModel: EditMinPriceRequestModel) {
    const data = JSON.stringify(editMinPriceRequestModel);
    return this.http.post(`/${this.url}/editminprice`, data, this.options);
  }

  public BulkEditSku(bulkEditSkuRequestModel: BulkEditSkuRequestModel[]) {
    const data = JSON.stringify(bulkEditSkuRequestModel);
    return this.http.post(`/${this.url}/bulkeditsku`, data, this.options);
  }

  public SearchFnSku(searchFnSkuRequestModel: SearchFnSkuRequestModel) {
    const data = JSON.stringify(searchFnSkuRequestModel);
    return this.http.post(`/${this.url}/getfnskubyname`, data, this.options);
  }

  public ScanBox(scanBoxRequestModel: ScanBoxRequestModel) {
    const data = JSON.stringify(scanBoxRequestModel);
    return this.http.post(`/${this.url}/scanbox`, data, this.options);
  }

  public DownloadNewAmazonSkus(account: string) {
    return this.http.get(
      `/${this.url}/downloadnewamazonskus?account=${account}`,
      { headers: this.headers, observe: "response", responseType: "blob" }
    );
  }

  public DownloadShipments(from: string, to: string) {
    return this.http.get(
      `/${this.url}/downloadshipments?from=${from}&to=${to}`,
      { headers: this.headers, observe: "response", responseType: "blob" }
    );
  }

  public RecountBoxNumbers(request: RecountBoxNumberRequest) {
    const data = JSON.stringify(request);
    return this.http.post(`/${this.url}/recountboxnumbers`, data, this.options);
  }

  public GetShipAddressById = (shipid: any) => {
    const url = `/${this.url}/shipaddressbyid/${shipid}`;
    return this.http.get(url, this.options);
  };

  public IsDuplicateWh = (warehouseId: string) => {
    const url = `/${this.url}/isduplicatewh/${warehouseId}`;
    return this.http.get(url, this.options);
  };
  public IsDraftable = (payload) => {
    const url = `/${this.url}/isdraftable`;
    return this.http.post(url, payload, this.options);
  };
}
