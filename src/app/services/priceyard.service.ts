import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { HeaderService } from "src/app/components/header/header.service";
import { AuthService } from "src/app/services/auth.service";

import { PricingModel } from "../models/priceyard.model";


@Injectable({
  providedIn: "root",
})
export class PriceyardService {
  private url = "api/Repricer";
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  accounts;
  options = { headers: this.headers };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private headerService: HeaderService
  ) {
    this.headerService.accountsSelected.subscribe((e) => {
      this.accounts = e;
    });
  }

  GetPriceModel() {
    return this.http.get<PricingModel[]>(
      `/${this.url}/ListRepriceModels/`,
      this.options
    );
  }

  SavePriceModel(priceModel: any) {
    return this.http.post(
      `/${this.url}/SaveRepriceModel2/`,
      priceModel,
      this.options
    );
  }

  GetRepriceModel(id, marketplaceType) {
    return this.http.get(
      `/${this.url}/GetRepricingModel2/?Id=${id}&MarketplaceType=${marketplaceType}`,
      this.options
    );
  }

  GetSkuList(body) {
    body.filterModel["Account"] = {
      filterType: "set",
      values: this.accounts,
    };
    return this.http.post(`/${this.url}/GetSkuList`, body, this.options);
  }

  UpdateMinMaxPricing(
    sku: string,
    account: string,
    minPrice: number,
    maxPrice: number
  ) {
    return this.http.put(
      `/${this.url}/updateminmaxpricing?sku=${sku}&account=${account}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      this.options
    );
  }

  EditNote(
    note: string,
    sku: string,
    account: string,
    fulfillmentType: string
  ) {
    return this.http.post(
      `/${this.url}/EditNote`,
      { sku, account, note, fulfillmentType },
      this.options
    );
  }

  ChangeMinPrice(sku, account, price, fulfillmentType) {
    return this.http.post(
      `/${this.url}/ChangeMinPrice`,
      { sku, account, price, fulfillmentType },
      this.options
    );
  }

  ChangeMaxPrice(sku, account, price, fulfillmentType) {
    return this.http.post(
      `/${this.url}/ChangeMaxPrice`,
      { sku, account, price, fulfillmentType },
      this.options
    );
  }

  ChangeCost(sku, account, cost, fulfillmentType) {
    return this.http.post(
      `/${this.url}/ChangeCost`,
      { sku, account, cost, fulfillmentType },
      this.options
    );
  }

  UpdateSkuPricingModel(sku, account, pricingModel) {
    return this.http.post(
      `/${this.url}/UpdateSkuPricingModel`,
      { sku, account, pricingModel },
      this.options
    );
  }

  UpdateSkuPricingActive(sku, account, pricingActive) {
    return this.http.post(
      `/${this.url}/UpdateSkuPricingActive`,
      { sku, account, pricingActive },
      this.options
    );
  }

  RepriceHistory(account: string) {
    return this.http.get(
      `/${this.url}/RepriceHistory?Account=${account}&PageNumber=1&RowsPerPage=10000`,
      this.options
    );
  }

  DownloadSkus(account: string) {
    return this.http.get(
      `/api/Shipments/DownloadSkus?Account=${account}`,
      this.options
    );
  }
}
