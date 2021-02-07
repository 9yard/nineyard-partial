import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { ListOrdersRequestModel, ListReturnsRequestModel, ListRemovalsRequestModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'api/order';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  public ListOrders(listOrdersRequestModel: ListOrdersRequestModel) {
    const data = JSON.stringify(listOrdersRequestModel);
    return this.http.post(`/${this.url}/listorders`, data, this.options);
  }

  public ListReturns(listReturnsRequestModel: ListReturnsRequestModel) {
    const data = JSON.stringify(listReturnsRequestModel);
    return this.http.post(`/${this.url}/listreturns`, data, this.options);
  }

  public ListRemovals(listRemovalsRequestModel: ListRemovalsRequestModel) {
    const data = JSON.stringify(listRemovalsRequestModel);
    return this.http.post(`/${this.url}/listremovals`, data, this.options);
  }

  public OrdSettlment(orderId: string) {
    return this.http.get(`/${this.url}/ordsettlment/${orderId}`, this.options);
  }
}
