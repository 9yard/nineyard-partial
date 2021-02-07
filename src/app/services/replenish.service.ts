import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { SelectRestInWhRequestModel, SelectRestordRequestModel } from '../models/replenish.model';

@Injectable({
  providedIn: 'root'
})
export class ReplenishService {
  private url = 'api/replenish';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  public ListReplenish(account: string, remainingDays: number, pageNumber: number, rowsPerPage: number, vendor: string) {
    const data = JSON.stringify({
      account,
      remainingDays,
      rowsPerPage,
      pageNumber,
      vendor
    });
    return this.http.post(`/${this.url}/listreplenish`, data, this.options);
  }

  public DuplicateSkus(sku: string, remainingDays: number, pageNumber: number, rowsPerPage: number) {
    const data = JSON.stringify({
      sku,
      remainingDays,
      rowsPerPage,
      pageNumber
    });
    return this.http.post(`/${this.url}/duplicateskus`, data, this.options);
  }

  public SelectRestInWh(selectRestInWhRequestModel: SelectRestInWhRequestModel) {
    const data = JSON.stringify(selectRestInWhRequestModel);
    return this.http.post(`/${this.url}/selectrestinwh`, data, this.options);
  }

  public SelectRestord(selectRestordRequestModel: SelectRestordRequestModel) {
    const data = JSON.stringify(selectRestordRequestModel);
    return this.http.post(`/${this.url}/selectrestord`, data, this.options);
  }
}
