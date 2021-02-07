import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { AccountModel, WarehouseModel, BillingInfoModel } from '../models/onboarding.model';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }
}
