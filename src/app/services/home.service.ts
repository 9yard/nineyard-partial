import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = 'api/home';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  public GetOpenShip() {
    return this.http.get(`/${this.url}/getopenship`, this.options);
  }

  public ShipmentDiscrepancy(isTop3 = false) {
    return this.http.get(`/${this.url}/shipmentdiscrepancy?isTop3=${isTop3}`, this.options);
  }

  public HomePageShipmentData() {
    return this.http.get(`/${this.url}/homepageshipmentdata`, this.options);
  }
}
