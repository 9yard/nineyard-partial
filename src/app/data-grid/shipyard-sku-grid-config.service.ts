import { Injectable } from "@angular/core";

import { GridOptions } from "@ag-grid-community/core";

import { SkuGridBaseConfigService } from "./sku-grid-base-config.service";
@Injectable({
  providedIn: "root",
})
export class ShipyardSkuGridConfigService {
  columnDefs;
  gridOptions: GridOptions;
  fulfillmentType = "Fbm";

  constructor(private skuGridBaseConfigService: SkuGridBaseConfigService) {
    this.columnDefs = [...this.skuGridBaseConfigService.columnDefs];
    this.columnDefs.splice(3, 0, {
      field: "AmountInShipment",
      headerName: "Select Quantity",
      cellRenderer: "amountInShipmentCellRendererComponent",
      width: 130,
      suppressMenu: true,
      pinned: true,
    });

    this.columnDefs.splice(
      7,
      0,
      {
        field: "FbaType",
        suppressMenu: true,
      },
      {
        field: "FbaError",
        suppressMenu: true,
      }
    );
  }
}
