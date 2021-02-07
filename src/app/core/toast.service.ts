import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public mtoast = new BehaviorSubject<string>(null);
  public mtoastErr = new BehaviorSubject<string>(null);

  constructor() { }

  public showToaster(msg: string) {
    this.mtoast.next(msg);
  }

  public showErrorToaster(msg: string) {
    this.mtoastErr.next(msg);
  }
}
