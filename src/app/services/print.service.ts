import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  public isPrinting = false;
  public arrayData$ = new BehaviorSubject<any[]>([]);

  constructor(private router: Router) { }

  public printDocument(documentName: string, documentData?: string[]) {
    this.isPrinting = true;
    if (documentData) {
      this.router.navigate(['/',
        {
          outlets: {
            print: ['print', documentName, documentData.join()]
          }
        }]);
    } else {
      this.router.navigate(['/',
        {
          outlets: {
            print: ['print', documentName]
          }
        }]);
    }
  }

  public onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null } }]);
    });
  }

  public setArrayData(data: any[]) {
    this.arrayData$.next(data);
  }
}
