import { ShipyardService } from "src/app/modules/shipyard/shipyard.service";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";

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
import { ChangeDetectionStrategy } from "@angular/compiler/src/compiler_facade_interface";

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
export class GridWrapperComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() gridOptions = this.skuGridBaseConfigService.gridOptions;
  @Input() columnDefs;
  modules: Module[] = [ServerSideRowModelModule];
  gridApi: GridApi;
  defaultColDef;
  rowModelType;
  rowData: [];
  tempCount = 0;
  private destroy$ = new Subject<void>();

  isSelectAll: boolean = false;
  constructor(
    public gridActionsService: GridActionsService,
    private gridApiService: GridApiService,
    public skuGridBaseConfigService: SkuGridBaseConfigService,
    public shipyardService: ShipyardService,
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef
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
    this.gridActionsService.dataUpdate$.subscribe(() => {
      setTimeout(() => {
        if (this.isSelectAll) {
          this.gridOptions.api.forEachNode((node) => {
            if (this.isSelectAll) {
              node.setSelected(true);
            } else {
              this.gridOptions.api.deselectAll();
            }
          });
        }
      }, 1000);
      this.dataChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataChanges();
  }

  dataChanges() {
    setTimeout(() => {
      let tempCount = [];
      this.gridOptions.api.forEachNode((node) => {
        tempCount.push(node.data);
        this.gridActionsService.selectedRows.forEach((element) => {
          if (node.data && node.data.Sku && element.Sku == node.data.Sku) {
            node.setSelected(true);
          }
        });
      });
      if (tempCount.length == this.gridActionsService.selectedRows.length) {
        this.gridActionsService.setIsSelected(true);
        // this.isSelectAll = true;
      } else {
        this.gridActionsService.setIsSelected(false);
        // this.isSelectAll = false;
      }
      this.cdr.detectChanges();
    }, 2000);
  }

  onGridReady(params: GridOptions) {
    this.gridApi = params.api;
    this.gridApiService.gridApi$.next(params);
  }

  onRowSelected(event) {
    var rowCount = event.api.getSelectedNodes().length;

    let tempCount = [];
    this.gridOptions.api.forEachNode((node) => {
      tempCount.push(node.data);
    });
    if (tempCount.length === rowCount) {
      this.isSelectAll = true;
    } else {
      this.isSelectAll = false;
    }
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

  onSelectAll() {
    this.isSelectAll = !this.isSelectAll;
    this.gridActionsService.setIsSelected(this.isSelectAll);
    this.gridOptions.api.forEachNode((node) => {
      if (this.isSelectAll) {
        node.setSelected(true);
      } else {
        this.gridOptions.api.deselectNode(node);
      }
    });
  }
}
