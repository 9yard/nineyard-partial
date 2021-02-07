import { Injectable } from "@angular/core";

import { Subject, Observable, fromEvent } from "rxjs";
import {
  debounceTime,
  filter,
  scan,
  tap,
  withLatestFrom,
} from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ScannerService {
  scanned: Observable<any> = new Subject();
  constructor() {
    this.listenToScan();
  }

  listenToScan() {
    const down = fromEvent(document, "keydown");

    const up = fromEvent(document, "keyup");

    const scannerKeys = up.pipe(
      filter((e: KeyboardEvent) => e.code !== "ShiftLeft"),
      filter((e: KeyboardEvent) => e.key !== "Process"),
      withLatestFrom(down, (u: KeyboardEvent, d: KeyboardEvent) => ({
        key: `${d.key}`,
        pressTime: u.timeStamp - d.timeStamp,
        e: u,
      })),
      filter((x) => x.pressTime < 5)
    );

    this.scanned = scannerKeys.pipe(
      tap((e) => console.log(e)),
      scan((acc, value) => {
        return value.key !== "Enter" ? acc + value.key : "";
      }, ""),
      filter((x) => x !== ""),
      debounceTime(50)
    );
  }
}
