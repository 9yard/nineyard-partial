import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { AccountByType } from '../models/account.model';

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private url = "api/settings";

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };

  constructor(private http: HttpClient) {}

  public GetAllAccounts() {
    return this.http.get(`/${this.url}/getallaccounts`, this.options);
  }

  public GetAccountsByType(): Observable<AccountByType> {
    return this.http.get<AccountByType>(`/${this.url}/GetAccountsByType`, this.options);
  }

  public GetAllVendors() {
    return this.http.get(`/${this.url}/getallvendors`, this.options);
  }

  public GetAllWarehouses() {
    return this.http.get(`/${this.url}/getallwarehouses`, this.options);
  }

  public GetWarehouse(id: any) {
    return this.http.get(`/${this.url}/getwarehouse/${id}`, this.options);
  }

  public DeleteAccount(acccount: any) {
    return this.http.delete(
      `/${this.url}/deleteaccount/${acccount}`,
      this.options
    );
  }

  public DeleteWh(id: any) {
    return this.http.delete(`/${this.url}/deletewh/${id}`, this.options);
  }

  public UpdateWh(request: any) {
    const data = JSON.stringify(request);
    return this.http.put(`/${this.url}/updatewh`, data, this.options);
  }

  public ToggleWhsIsFba(id: string, enable: boolean) {
    return this.http.put(
      `/${this.url}/togglewhsisfba?id=${id}&enable=${enable}`,
      this.options
    );
  }

  public GetAllPrinters() {
    return this.http.get(`/${this.url}/getallprinters`, this.options);
  }

  public GetSelectedPrinter() {
    return this.http.get(`/${this.url}/getselectedprinter`, this.options);
  }

  public GetIncludeFnSkuOnPrint() {
    return this.http.get(`/${this.url}/GetIncludeFnSkuOnPrint`, this.options);
  }

  public SavePrinter(
    printer: string,
    width: number,
    height: number,
    printerType: number
  ) {
    const data = JSON.stringify({ printer, width, height, printerType });
    return this.http.post(`/${this.url}/saveprinter`, data, this.options);
  }

  public IncludeFnSkuOnPrint(isOn: boolean) {
    return this.http.post(
      `/${this.url}/IncludeFnSkuOnPrint?isOn=${isOn}`,
      null,
      this.options
    );
  }
}
