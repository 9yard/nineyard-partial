import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import {
  SendToProductionRequestModel,
  MapValidateRequestModel,
  ItemsBulkRequestModel,
  SkuMappingRequestModel,
  EditActiveRequestModel
} from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private url = 'api/inventory';
  public itemEditDataSync: Subject<any> = new Subject();
  public vendorEditDataSync: Subject<any> = new Subject();
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  public SendToProduction(sendToProductionRequestModel: SendToProductionRequestModel[]) {
    const data = JSON.stringify(sendToProductionRequestModel);
    return this.http.post(`/${this.url}/sendtowh`, data, this.options);
  }

  public MapValidateItem(request: string[]) {
    const data = JSON.stringify(request);
    return this.http.post(`/${this.url}/mapvalidateitem`, data, this.options);
  }

  public MapValidateSku(request: string[]) {
    const data = JSON.stringify(request);
    return this.http.post(`/${this.url}/mapvalidatesku`, data, this.options);
  }

  public MapValidate(request: MapValidateRequestModel[]) {
    const data = JSON.stringify(request);
    return this.http.post(`/${this.url}/mapvalidate`, data, this.options);
  }

  public Map(request: MapValidateRequestModel[]) {
    const data = JSON.stringify(request);
    return this.http.post(`/${this.url}/mapbulk`, data, this.options);
  }

  public AllUnmapped() {
    return this.http.get(`/${this.url}/allunmapped`, this.options);
  }

  public addInventoryItems(request: any): Observable<any[]> {
    return this.http.post<any[]>(`/${this.url}/newitem`, request, this.options);
  }

  public editInventoryItems(request: any): Observable<any[]> {
    return this.http.put<any[]>(`/${this.url}/edititem`, request, this.options);
  }

  public searchItem(request: string): Observable<any[]> {
    return this.http.get<any[]>(`/${this.url}/searchitem/${request}`);
  }

  public searchVender(request: string): Observable<any[]> {
    return this.http.get<any[]>(`/${this.url}/searchvender/${request}`);
  }

  public searchSku(request: string): Observable<any[]> {
    return this.http.get<any[]>(`/${this.url}/searchsku/${request}`);
  }

  public searchSkuByAccount(sku: string, account: string): Observable<any[]> {
    return this.http.get<any[]>(`/${this.url}/searchskubyaccount/${account}/${sku}`);
  }

  public searchSkuByAccountOversized(sku: string, account: string, isOversized: any): Observable<any[]> {
    return this.http.get<any[]>(`/${this.url}/searchskubyaccountoversized/${account}/${sku}/${isOversized}`);
  }

  public editNewVendor(request: any): Observable<any[]> {
    return this.http.put<any[]>(`/${this.url}/editvendor`, request, this.options);
  }

  public addNewVendor(request: any): Observable<any[]> {
    return this.http.post<any[]>(`/${this.url}/newvendor`, request, this.options);
  }

  public MarkupValidate(skus: string[], acc: string) {
    const data = JSON.stringify({ skus, account: acc });
    return this.http.post(`/${this.url}/markupvalidate`, data, this.options);
  }

  public MarkupBulk(skus: string[], markups: number[], markupMins: number[], acc: string) {
    const data = JSON.stringify({
      skus,
      markups,
      markupMins,
      account: acc
    });
    return this.http.post(`/${this.url}/markupbulk`, data, this.options);
  }

  public ItemsValidate(items: string[]) {
    const data = JSON.stringify(items);
    return this.http.post(`/${this.url}/itemsvalidate`, data, this.options);
  }

  public ItemsBulk(itemsBulkRequestModel: ItemsBulkRequestModel[]) {
    const data = JSON.stringify(itemsBulkRequestModel);
    return this.http.post(`/${this.url}/itemsbulk`, data, this.options);
  }

  public SkuMapping(skuMappingRequestModel: SkuMappingRequestModel) {
    const data = JSON.stringify(skuMappingRequestModel);
    return this.http.post(`/${this.url}/skumapping`, data, this.options);
  }

  public EditActive(editActiveRequestModel: EditActiveRequestModel[]) {
    const data = JSON.stringify(editActiveRequestModel);
    return this.http.post(`/${this.url}/editactive`, data, this.options);
  }

  public GetSkuErrors() {
    return this.http.get(`/${this.url}/sku/errors`, this.options);
  }

  public GetVendorDropShip(id: any) {
    return this.http.get(`/${this.url}/vendordropship/${id}`, this.options);
  }

  public SkuErrorsDismiss(sku: any, account: any, shipgoodtype: any) {
    const data = JSON.stringify({ sku, account, shipgoodtype });
    return this.http.put(`/${this.url}/sku/errors/dismiss`, data, this.options);
  }

  public SkuByAccount(
    account: any, inactive: boolean,
    page?: number, limit?: number, searchText?: string,
    sortColumn?: number, sortDesc?: boolean) {
    const data = JSON.stringify({
      Account: account,
      Active: !inactive,
      PageNumber: page,
      RowsPerPage: limit,
      Search: searchText,
      SortColumn: sortColumn,
      SortDesc: sortDesc ? sortDesc : false
    });
    return this.http.post(`/${this.url}/skubyaccount`, data, this.options);
  }

  public SkuExact(sku: string, account: string) {
    const data = JSON.stringify({
      Search: sku,
      Account: account,
      Exact: true
    });
    return this.http.post(`/${this.url}/skubyaccount`, data, this.options);
  }

  public ListItemsByFilter(request: any) {
    const data = JSON.stringify(request);
    return this.http.post(`/${this.url}/listitemsbyfilter`, data, this.options);
  }

  public ListVendors(page: number, limit: number, searchText: string, sortColumn: number, sortDesc: boolean) {
    const data = JSON.stringify({
      PageNumber: page,
      RowsPerPage: limit,
      Search: searchText,
      SortColumn: sortColumn,
      SortDesc: sortDesc
    });
    return this.http.post(`/${this.url}/listvendors`, data, this.options);
  }

  public SelectVendor(id: string) {
    return this.http.get(`/${this.url}/selectvendor/${id}`, this.options);
  }

  public MappedSkusToItems(id: string) {
    return this.http.get(`/${this.url}/mappedskustoitems/${id}`, this.options);
  }

  public RelatedItems(id: string) {
    return this.http.get(`/${this.url}/relateditems/${id}`, this.options);
  }

  public ItemCodes(id: string) {
    return this.http.get(`/${this.url}/itemcodes/${id}`, this.options);
  }

  public DropShipInventory(id: string) {
    return this.http.get(`/${this.url}/dropshipinventory/${id}`, this.options);
  }

  public LocSummary(request: any) {
    const data = JSON.stringify(request);
    return this.http.post(`/${this.url}/locsummary`, data, this.options);
  }

  public LocHistory(request: any) {
    const data = JSON.stringify(request);
    return this.http.post(`/${this.url}/lochistory`, data, this.options);
  }

  public ProductList(page: number, perPage: number, search = '', sortColumn = 1, sortOrder = false) {
    const data = JSON.stringify({
      PageNumber: page,
      RowsPerPage: perPage,
      Search: search,
      SortColumn: sortColumn,
      SortDesc: sortOrder
    });
    return this.http.post(`/${this.url}/productlist`, data, this.options);
  }

  public getProductMappingList = (itemGroup: any) => {
    const url = `/${this.url}/ProductMappingList?ItemGroup=${itemGroup}`;
    return this.http.get(url, this.options);
  }
  public getProductMappingDetails = (itemGroup: any, MapId: string) => {
    const url = `/${this.url}/ProductMappingDetails?ItemGroup=${itemGroup}&MapId=${MapId}`;
    return this.http.get(url, this.options);
  }
  public getProductPurchaseLines = (itemGroup: any) => {
    const url = `/${this.url}/ProductPurchaseLines?ItemGroup=${itemGroup}`;
    return this.http.get(url, this.options);
  }
  public addNewProduct = (payload: any) => {
    const url = `/${this.url}/AddProduct`;
    return this.http.post(url, payload, this.options);
  }
  public addNewPurchaseLine = (payload) => {
    const url = `/${this.url}/AddPurchaseLine`;
    return this.http.post(url, payload, this.options);
  }
  public editMapping = (payload) => {
    const url = `/${this.url}/EditMappings`;
    return this.http.post(url, payload);
  }
  public updateIsoversized = (sku: string, isOversized: number,account:string) => {
    const payload = { isOversized, sku,  account};
    console.log(payload);
    const url = `/${this.url}/UpdateIsoversized`;
    return this.http.post(url, payload);
  }
}
