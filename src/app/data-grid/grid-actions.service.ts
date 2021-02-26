import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

import { StartEditingCellParams } from "@ag-grid-community/core";
import { GridApi, GridOptions } from "@ag-grid-community/core";

import { Injectable } from "@angular/core";

import { saveAs } from "file-saver";

import { HeaderService } from "src/app/components/header/header.service";
import { StorageKeyEnum } from "src/app/core/StorageKeyEnum";
import { EditActiveRequestModel } from "src/app/models/inventory.model";
import { InventoryService } from "src/app/services/inventory.service";

import { PriceyardService } from "../services/priceyard.service";
import { SettingsService } from "../services/settings.service";
import { ShipyardService } from "./../modules/shipyard/shipyard.service";
import { PlanShipmentDialogComponent } from "../modules/shipyard/shipments-list/plan-shipment-dialog/plan-shipment-dialog.component";

import { GridApiService } from "./grid-api.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GridActionsService {
  gridOptions: GridOptions;
  gridApi: GridApi;
  currentPaneSetting = "";
  selectedRows = [];
  selectedFilters;
  printer;
  account;

  private dataUpdated = new BehaviorSubject<any>(null);
  dataUpdate$ = this.dataUpdated.asObservable();

  constructor(
    private priceyardService: PriceyardService,
    private gridApiService: GridApiService,
    private inventoryService: InventoryService,
    private shipyardService: ShipyardService,
    private dialog: MatDialog,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar,
    private headerService: HeaderService
  ) {
    this.gridApiService.gridApi$.subscribe((e) => {
      this.gridOptions = e;
      this.gridApi = this.gridOptions.api;
    });

    this.settingsService.GetSelectedPrinter().subscribe((printer: any[]) => {
      this.printer = printer.find((x) => x.printerType === 1);
    });

    this.headerService.accountsSelected.subscribe((e) => {
      this.account = e;
    });
  }

  editNote(event) {
    const data = event.data;
    this.priceyardService
      .EditNote(data.Note, data.Sku, data.Account, data.FulfillmentType)
      .subscribe();
  }

  saveMinPrice(event) {
    const data = event.data;
    this.priceyardService
      .ChangeMinPrice(
        data.Sku,
        data.Account,
        data.Minpr.price,
        data.FulfillmentType
      )
      .subscribe();
  }

  saveMaxPrice(event) {
    const data = event.data;
    this.priceyardService
      .ChangeMaxPrice(
        data.Sku,
        data.Account,
        data.Maxpr.price,
        data.FulfillmentType
      )
      .subscribe();
  }

  saveCost(event) {
    const data = event.data;
    this.priceyardService
      .ChangeCost(data.Sku, data.Account, data.Cost, data.FulfillmentType)
      .subscribe();
  }

  updateSkuPricingModel(event) {
    const data = event.data;
    console.log(data);

    // this.priceyardService.UpdateSkuPricingActive(data.Sku, data.Account, data.Prmodel.isActive)
    //   .subscribe();
    this.priceyardService
      .UpdateSkuPricingModel(data.Sku, data.Account, data.Prmodel.modelId)
      .subscribe();
  }

  saveColumnState(): void {
    if (this.gridOptions) {
      localStorage.setItem(
        StorageKeyEnum.AgGridPriceyard,
        JSON.stringify(this.gridOptions.columnApi.getColumnState())
      );
    }
  }

  applycolumnState() {
    if (this.gridOptions) {
      const state = JSON.parse(
        localStorage.getItem(StorageKeyEnum.AgGridPriceyard)
      );
      if (state) {
        this.gridOptions.columnApi.applyColumnState({ state });
      }
    }
  }

  toggleSidePane() {
    const options = ["", "filters", "columns"];
    const currentOptionIndex = options.indexOf(this.currentPaneSetting);
    this.currentPaneSetting =
      currentOptionIndex + 1 < options.length
        ? options[currentOptionIndex + 1]
        : options[0];
    this.gridApi.openToolPanel(this.currentPaneSetting);
  }

  updateSelectedRows(e) {
    this.selectedRows = this.getSelected();
    this.dataUpdated.next(this.selectedRows);
  }

  updateSelectedFilters() {
    this.selectedFilters = this.gridApi.getFilterModel();
    console.log(this.selectedFilters);
  }

  getSelected(): any[] {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const data = selectedNodes.map((node) => {
      return node.data;
    });
    return data;
  }

  toggleActivate(isActive) {
    const data: EditActiveRequestModel[] = this.selectedRows.map((data) => {
      return {
        account: data.Account,
        active: isActive,
        sku: data.Sku,
      };
    });

    this.inventoryService.EditActive(data).subscribe(() => {
      const idsToUpdate = this.gridApi.getSelectedNodes().map(function (node) {
        return node.id;
      });

      this.gridApi.forEachNode((rowNode) => {
        if (idsToUpdate.indexOf(rowNode.id) >= 0) {
          const updated = JSON.parse(JSON.stringify(rowNode.data));
          updated.Active = isActive;
          rowNode.setData(updated);
          this.gridApi.refreshCells({
            force: true,
            columns: ["Sku"],
            rowNodes: [rowNode],
          });
        }
      });
    });
  }

  resetTable() {
    this.gridOptions.columnApi.resetColumnState();
  }

  resetFilters() {
    this.gridApi.setFilterModel(null);
  }

  editCell(params: StartEditingCellParams) {
    this.gridApi.startEditingCell(params);
  }

  createDraft() {
    this.dialog.open(PlanShipmentDialogComponent, {
      width: "600px",
      data: {
        warehouses$: this.settingsService.GetAllWarehouses(),
        isDraft: true,
        title: "Create Shipment Draft",
      },
    });
  }

  printFNSKU() {
    const skus = this.selectedRows.map((data) => {
      return {
        sku: data.Sku,
        qty: 1,
      };
    });
    const data = {
      skus: skus,
      account: this.account[0],
    };

    return this.shipyardService.PrintSku(data).subscribe(
      (value: any) => {
        this.printLabel(value, "SkuLabel");
      },
      (err) =>
        this.snackBar.open("Error printing labels", "Dismiss", {
          duration: 5000,
        })
    );
  }

  printLabel(printObject, downloadName?: string) {
    switch (this.printer.printer) {
      case "Preview in browser":
        window.open(URL.createObjectURL(printObject.body), "_blank");
        break;
      case "Save as pdf":
      default:
        saveAs(printObject.body, `${downloadName}.pdf`);
        break;
    }
  }
  importFromAmazon() {
    this.priceyardService
      .DownloadSkus(this.account)
      .subscribe((e) => console.log(e));
  }
}
