import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private url = 'api/common';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };
  constructor(private http: HttpClient) { }

  public DataQueue(data: any) {
    return this.http.post(`/${this.url}/dataqueue`, data, this.options);
  }
  public AddToShipment(data: any) {
    return this.http.post(`/${this.url}/addtoshipment`, data, this.options);
  }
  public UpdateShipment(arg1: string, arg2: string) {
    const data = JSON.stringify({
      type: 'Update Shipment QTY',
      arg1,
      arg2
    });
    return this.http.post(`/${this.url}/updateshipment`, data, this.options);
  }

  public UpdateBoxContent(arg1: string, arg2: string) {
    const data = JSON.stringify({
      type: 'Upload box content',
      arg1,
      arg2
    });
    return this.http.post(`/${this.url}/updateboxcontent`, data, this.options);
  }

  public CloseShipment(arg1: string, arg2: string, arg3: string) {
    const data = JSON.stringify({
      type: 'Submit Shipment',
      arg1,
      arg2,
      arg3
    });
    return this.http.post(`/${this.url}/closeshipment`, data, this.options);
  }

  public GetQueueProcessingUpdates(id) {
    return this.http.get(`/${this.url}/GetQueueProcessingUpdates/${id}`, this.options);
  }
}
