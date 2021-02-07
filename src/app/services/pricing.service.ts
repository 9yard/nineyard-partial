import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import {
  ListPricingRequestModel,
  SelectPricingRequestModel,
  RefSellerModel,
  SelectSellerModel,
  RefPricingHistoryRequestModel,
  RefPricingHistoryModel,
  SelectPricingModel
} from '../models/pricing.model';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  private url = 'api/pricing';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  public ListPricing(listPricingsRequestModel: ListPricingRequestModel) {
    const data = JSON.stringify(listPricingsRequestModel);
    return this.http.post(`/${this.url}/listreprice`, data, this.options);
  }

  public UpdateRepriceFlags(sku: string, account: string, col: string) {
    return this.http.put(`/${this.url}/updaterepriceflags?sku=${sku}&account=${account}&col=${col}`, this.options);
  }

  public UpdateRepriceFlagsMan(sku: string, account: string, col: string, flag: boolean) {
    return this.http.put
      (`/${this.url}/updaterepriceflags?sku=${sku}&account=${account}&col=${col}&flag=${flag}`,
        this.options);
  }

  public UpdateMinMaxPricing(sku: string, account: string, minPrice: number, maxPrice: number) {
    return this.http.put
      (`/${this.url}/updateminmaxpricing?sku=${sku}&account=${account}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        , this.options);
  }

  public PriceSettlment(selectPricingRequestModel: SelectPricingRequestModel) {
    const data = JSON.stringify(selectPricingRequestModel);
    return this.http.post<SelectPricingModel>(`/${this.url}/selectreppricing`, data, this.options);
  }

  public RefSeller(page: number, limit: number) {
    return this.http.get<RefSellerModel[]>(`/${this.url}/refseller?page=${page}&limit=${limit}`,
      this.options);
  }

  public SelectSeller(id: string) {
    return this.http.get<SelectSellerModel[]>(`/${this.url}/selectseller/${id}`, this.options);
  }

  public RefPricingHistory(refPricingHistoryRequestModel: RefPricingHistoryRequestModel) {
    const data = JSON.stringify(refPricingHistoryRequestModel);
    return this.http.post<RefPricingHistoryModel[]>(`/${this.url}/refpricinghistory`, data, this.options);
  }
  public saveMapModel(newMapPriceScheduleModel: object) {
    const data = JSON.stringify(newMapPriceScheduleModel);
    return this.http.post(`/${this.url}/savemapmodel`, data, this.options);
  }
  public savePrcModel(savePrcRequestModel) {
    const data = JSON.stringify(savePrcRequestModel);
    return this.http.post(`/${this.url}/saveprcmodel`, data, this.options);
  }
  public editPrcModel(modelId: any) {
    return this.http.get(`/${this.url}/editmodel/` + modelId, this.options);
  }
  public listModel() {
    return this.http.get(`/${this.url}/listmodel`, this.options);
  }
  public editNote(note: string, sku: string, account: string) {
    return this.http.get(`/${this.url}/editnote?sku=${sku}&account=${account}&note=${note}`,
      this.options);
  }
  public updatePrcModel(updatePrcModel) {
    const data = JSON.stringify(updatePrcModel);
    return this.http.put(`/${this.url}/updateprcmodel`, data, this.options);
  }

  public SkusValidate(request: string[], account: string) {
    const data = JSON.stringify(request);
    return this.http.post(`/${this.url}/skusvalidate?account=${account}`, data, this.options);
  }

  public SavePricingSku(request: any) {
    const data = JSON.stringify(request);
    return this.http.post(`/${this.url}/savepricingsku`, data, this.options);
  }


}
