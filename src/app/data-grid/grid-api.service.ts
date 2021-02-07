import { GridApi, GridOptions, GridParams } from "@ag-grid-community/core";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GridApiService {
  gridApi$: Subject<GridOptions> = new Subject();

  constructor() {}
}
