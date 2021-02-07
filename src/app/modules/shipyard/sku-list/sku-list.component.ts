import {
  GridApi,
  GridOptions,
  IServerSideDatasource,
} from "@ag-grid-community/core";
import { GridApiService } from "./../../../data-grid/grid-api.service";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { ShipyardSkuGridConfigService } from "./../../../data-grid/shipyard-sku-grid-config.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ShipyardService } from "../shipyard.service";

@Component({
  selector: "app-sku-list",
  templateUrl: "./sku-list.component.html",
  styleUrls: ["./sku-list.component.scss"],
})
export class SkuListComponent implements OnInit, OnDestroy {
  columnDefs = this.shipyardSkuGridConfigService.columnDefs;
  private destroy$ = new Subject<void>();
  gridApi: GridApi;
  dataSource: IServerSideDatasource = {
    getRows: (params: any) => {
      this.shipyardService.GetSkuList(params.request).subscribe(
        (response: any) => {
          if (response) {
            if (!response.totalCount) {
              this.gridApi.showNoRowsOverlay();
            }
            params.success({
              rowData: response.data,
              rowCount: response.totalCount,
            });
          }
        },
        () => params.fail()
      );
    },
  };

  constructor(
    private shipyardSkuGridConfigService: ShipyardSkuGridConfigService,
    private gridApiService: GridApiService,
    private shipyardService: ShipyardService
  ) {}

  ngOnInit(): void {
    this.gridApiService.gridApi$
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: GridOptions) => {
        // e.api.setFilterModel({
        //   "FulfillmentType": {
        //     filterType: 'text',
        //     filter: "Fba",
        //     type: "equals"
        //   }
        // });
        // e.api.onFilterChanged();
        this.gridApi = e.api;
        this.gridApi.setServerSideDatasource(this.dataSource);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
