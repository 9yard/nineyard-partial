import { ShipyardService } from "src/app/modules/shipyard/shipyard.service";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";

import {
  GridApi,
  GridOptions,
  Module,
  ModuleRegistry,
} from "@ag-grid-community/core";

import { ClipboardModule } from "@ag-grid-enterprise/clipboard";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { SideBarModule } from "@ag-grid-enterprise/side-bar";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";

import { GridActionsService } from "../grid-actions.service";
import { GridApiService } from "../grid-api.service";
import { SkuGridBaseConfigService } from "./../sku-grid-base-config.service";
import { filter, takeUntil } from "rxjs/operators";
import { HeaderService } from "src/app/components/header/header.service";
import { Subject } from "rxjs";

ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  MultiFilterModule,
  SetFilterModule,
  SideBarModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  ClipboardModule,
  RangeSelectionModule,
]);

@Component({
  selector: "app-grid-wrapper",
  templateUrl: "./grid-wrapper.component.html",
  styleUrls: ["./grid-wrapper.component.scss"],
})
export class GridWrapperComponent implements OnInit, OnDestroy {
  @Input() gridOptions = this.skuGridBaseConfigService.gridOptions;
  @Input() columnDefs;
  modules: Module[] = [ServerSideRowModelModule];
  gridApi: GridApi;
  defaultColDef;
  rowModelType;
  rowData: [];
  private destroy$ = new Subject<void>();

  constructor(
    public gridActionsService: GridActionsService,
    private gridApiService: GridApiService,
    public skuGridBaseConfigService: SkuGridBaseConfigService,
    public shipyardService: ShipyardService,
    private headerService: HeaderService
  ) {
    this.tabToNextCell = this.tabToNextCell.bind(this);
  }

  ngOnInit(): void {
    this.headerService.remoteActionBroadcaster
      .pipe(
        takeUntil(this.destroy$),
        filter((e) => e === "DownloadSkus")
      )
      .subscribe((e) => {
        this.gridApi.refreshServerSideStore({});
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onGridReady(params: GridOptions) {
    this.gridApi = params.api;
    this.gridApiService.gridApi$.next(params);
  }

  tabToNextCell(params) {
    var previousCell = params.previousCellPosition,
      lastRowIndex = previousCell.rowIndex,
      nextRowIndex = params.backwards ? lastRowIndex - 1 : lastRowIndex + 1,
      renderedRowCount = this.gridApi.getModel().getRowCount(),
      result;
    if (nextRowIndex < 0) {
      nextRowIndex = -1;
    }
    if (nextRowIndex >= renderedRowCount) {
      nextRowIndex = renderedRowCount - 1;
    }
    result = {
      rowIndex: nextRowIndex,
      column: previousCell.column,
      floating: previousCell.floating,
    };
    return result;
  }
}
