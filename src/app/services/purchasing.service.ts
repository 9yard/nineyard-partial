import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { NewPoRequestModel, EditPoRequestModel } from '../models/purchasing.model';

@Injectable({
  providedIn: 'root'
})
export class PurchasingService {
  private url = 'api/purchasing';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  public ListPosByFilter(startDate: string, endDate: string) {
    const data = JSON.stringify({ startDate, endDate });
    return this.http.post(`/${this.url}/listposbyfilter`, data, this.options);
  }

  public GetPos(id: number) {
    return this.http.get(`/${this.url}/getpos/${id}`, this.options);
  }

  public NextPoid() {
    return this.http.get(`/${this.url}/nextpoid`, this.options);
  }

  public NewPo(newPoRequestModel: NewPoRequestModel) {
    const data = JSON.stringify(newPoRequestModel);
    return this.http.post(`/${this.url}/newpo`, data, this.options);
  }

  public EditPo(editPoRequestModel: EditPoRequestModel) {
    const data = JSON.stringify(editPoRequestModel);
    return this.http.post(`/${this.url}/editpo`, data, this.options);
  }

  public listPurchasing(PageNumber: any, RowsPerPage: any) {
    const data = JSON.stringify({
      PageNumber,
      RowsPerPage
    });
    return this.http.post(`/${this.url}/listpurchasing`, data, this.options);
  }

  public addToPo(itemQty) {
    const data = JSON.stringify(itemQty);
    return this.http.post(`/${this.url}/addtopo`, data, this.options);
  }

}
