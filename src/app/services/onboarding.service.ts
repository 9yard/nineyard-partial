import { Injectable, OnInit } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { takeUntil, tap } from "rxjs/operators";

import { StorageKeyEnum } from "../core/StorageKeyEnum";
import { LoginModel } from "../models/login.model";
import {
  AccountModel,
  WarehouseModel,
  BillingInfoModel,
  AddWalmartAccount,
} from "../models/onboarding.model";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class OnboardingService {
  private url = "api/onboarding";
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  tenantId = this.authService.getTenantId();

  options = { headers: this.headers };

  private _userInfo: LoginModel;
  price: number;
  onboardingStep: number;
  userInfo: LoginModel;


  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.userInfo$
      .subscribe((data) => this.userInfo = data);
   }
  
  public InsertAccount(accountModel: AccountModel) {
    const data = JSON.stringify(accountModel);
    return this.http.post(`/${this.url}/account`, data, {
      headers: this.headers,
      observe: "response",
      responseType: "text",
    });
  }

  public UpdateAccount(accountModel: AccountModel) {
    const data = JSON.stringify(accountModel);
    return this.http.put(`/${this.url}/account`, data, this.options);
  }

  public InsertBillingInfo(billingInfoModel: BillingInfoModel) {
    const data = JSON.stringify(billingInfoModel);
    return this.http.post(`/${this.url}/addbillinginfo`, data, {
      headers: this.headers,
      observe: "response",
      responseType: "text",
    });
  }

  public InsertWarehouse(warehouseModel: WarehouseModel) {
    const data = JSON.stringify(warehouseModel);
    return this.http.post(`/${this.url}/addwh`, data, this.options);
  }

  public AmazonLink() {
    return this.http.get(`/${this.url}/amazonlink`, {
      headers: this.headers,
      responseType: "text",
    });
  }

  public AmazonMarkets() {
    return this.http.get(`/${this.url}/amazonmarkets`, this.options);
  }

  public DuplicateAccountName(value: string) {
    return this.http.get(
      `/${this.url}/DuplicateAccountName?value=${value}`,
      this.options
    );
  }

  public UpdateOnboardingStep(step: number) {
    const user = JSON.parse(
      localStorage.getItem(StorageKeyEnum.User)
    ) as LoginModel;
    return this.http.get(
      `/${this.url}/updateonboardingstep/${user.userId}/${step}`,
      this.options
    ).pipe(tap(() => {
      let newUserObject = user;
      newUserObject['onboardingStep'] = step;
      console.log(newUserObject);
      
      localStorage.setItem(StorageKeyEnum.User, JSON.stringify(newUserObject))
    }));
  }

  public verifyCredential(verifycredential: any) {
    return this.http.post(
      `/${this.url}/verifycredential`,
      verifycredential,
      this.options
    );
  }

  public getStates() {
    return this.http.get("./assets/states.json");
  }

  public SaveProductsSelected(products: string[]) {
    
    return this.http.post(
      `/${this.url}/SaveProductsSelected`,
      {products, tenantId: this.tenantId},
      this.options
    );
  }

  public AddWalmartAccount(data :AddWalmartAccount) {
    return this.http.post(
      `/${this.url}/AddWalmartAccount`,
      data,
      this.options
    );
    
  }

}
