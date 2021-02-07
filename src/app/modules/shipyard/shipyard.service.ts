import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Subject } from "rxjs";

import {
  AddSkuToBoxRequest,
  EditShipmentSkuRequest,
} from "src/app/models/shipyard.model";

import { HeaderService } from "./../../components/header/header.service";

@Injectable({
  providedIn: "root",
})
export class ShipyardService {
  scanningBoxId: string;
  destroy$ = new Subject<void>();
  dropListIds: string[] = [];
  private url = "api/Shipments";
  account;
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };
  skusToAddToShipment = [];
  shipmentTypeToAddToShipment: string;

  constructor(private http: HttpClient, private headerService: HeaderService) {
    this.headerService.accountsSelected.subscribe((e) => (this.account = e[0]));
  }

  GetShipments(account, startRow, endRow, statuses?: string[], ShipmentType?) {
    return this.http.get(
      `/${
        this.url
      }/GetShipments?Account=${account}&StartRow=${startRow}&EndRow=${endRow}${
        statuses.length ? "&Statuses=" + statuses : ""
      }${ShipmentType ? "&ShipmentType=" + ShipmentType : ""}`,
      this.options
    );
  }

  GetShipmentDetail(shipmentId: number, refresh: boolean) {
    return this.http.get(
      `/${this.url}/GetShipmentDetails?ShipmentHeaderID=${shipmentId}&IsRefresh=${refresh}`,
      this.options
    );
  }

  EditShipmentSku(shipmentSku: EditShipmentSkuRequest) {
    return this.http.post(
      `/${this.url}/EditShipmentSku/`,
      shipmentSku,
      this.options
    );
  }

  AddSkuToBox(addSkuToBoxRequest: AddSkuToBoxRequest) {
    return this.http.post(
      `/${this.url}/AddSkuToBox/`,
      addSkuToBoxRequest,
      this.options
    );
  }

  CreateBox(shipmentHeaderId: number) {
    return this.http.post(
      `/${this.url}/CreateBox/`,
      { shipmentHeaderId },
      this.options
    );
  }

  UnpackBox(boxId: number, shipmentHeaderId: number) {
    return this.http.post(
      `/${this.url}/UnpackBox/`,
      { shipmentHeaderId, boxId },
      this.options
    );
  }

  UnpackAll(shipmentHeaderId: number) {
    return this.http.post(
      `/${this.url}/UnpackAll/`,
      { shipmentHeaderId },
      this.options
    );
  }

  RemoveEmptyBoxes(shipmentHeaderId: number) {
    return this.http.post(
      `/${this.url}/RemoveEmptyBoxes/`,
      { shipmentHeaderId },
      this.options
    );
  }

  DeleteBox(boxId: number, shipmentHeaderId: number) {
    return this.http.post(
      `/${this.url}/DeleteBox/`,
      { shipmentHeaderId, boxId },
      this.options
    );
  }

  CreateShipmentDraft(
    account,
    shipmentType,
    fromWarehouse,
    skus?: { sku: string; qty: number }[]
  ) {
    return this.http.post(
      `/${this.url}/CreateShipmentDraft/`,
      { account, shipmentType: +shipmentType, fromWarehouse, skus },
      this.options
    );
  }

  TypeaheadSku(account, query, type = "") {
    return this.http.get(
      `/${this.url}/TypeaheadSku?Account=${account}&Qry=${query}&Type=${type}`,
      this.options
    );
  }

  ClearShipment(shipmentHeaderId, DeleteBoxed) {
    return this.http.post(
      `/${this.url}/ClearShipment/`,
      { shipmentHeaderId, DeleteBoxed },
      this.options
    );
  }

  PrintSku(data) {
    return this.http.post(`/${this.url}/PrintSku/`, data, {
      headers: this.headers,
      observe: "response",
      responseType: "blob",
    });
  }

  GetShipmentPlans(shipmentType) {
    return this.http.get(
      `/${this.url}/GetShipmentPlans?Account=${this.account}&ShipmentType=${shipmentType}`,
      this.options
    );
  }

  PlanShip(data) {
    data["account"] = this.account;
    return this.http.post(`/${this.url}/PlanShip`, data, this.options);
  }

  ConfirmShipment(shipmentPlanHeaderId) {
    return this.http.post(
      `/${this.url}/ConfirmShipment`,
      { shipmentPlanHeaderId },
      this.options
    );
  }

  MergeShipment(shipmentHeaderId, destinationShipmentId) {
    return this.http.post(
      `/${this.url}/MergeShipment`,
      { shipmentHeaderId, destinationShipmentId },
      this.options
    );
  }

  CompleteShipment(
    shipmentHeaderId: number,
    submitBoxContent: boolean,
    overFlowToDraft: boolean
  ) {
    return this.http.post(
      `/${this.url}/CompleteShipment`,
      { shipmentHeaderId, submitBoxContent, overFlowToDraft },
      this.options
    );
  }

  DeleteShipmentDraft(shipmentHeaderId: number) {
    return this.http.post(
      `/${this.url}/DeleteShipmentDraft`,
      { shipmentHeaderId },
      this.options
    );
  }

  RemoveSkuFromBox(
    sku: string,
    shipmentHeaderId: number,
    qty: number,
    boxId: number
  ) {
    return this.http.post(
      `/${this.url}/RemoveSkuFromBox`,
      { sku, shipmentHeaderId, qty, boxId },
      this.options
    );
  }

  UpdateBoxSkuQty(
    sku: string,
    shipmentHeaderId: number,
    qty: number,
    boxId: number,
    append: boolean
  ) {
    return this.http.post(
      `/${this.url}/UpdateBoxSkuQty`,
      { sku, shipmentHeaderId, qty, boxId, append },
      this.options
    );
  }

  GetSkuList(body) {
    body.filterModel["FulfillmentType"] = {
      filterType: "set",
      values: ["Fba"],
    };
    body.filterModel["Account"] = {
      filterType: "set",
      values: [this.account],
    };
    return this.http.post(`api/Repricer/GetSkuList`, body, this.options);
  }

  DownloadShipments(account: string) {
    return this.http.get(
      `/${this.url}/DownloadShipments?Account=${account}`,
      this.options
    );
  }
}
