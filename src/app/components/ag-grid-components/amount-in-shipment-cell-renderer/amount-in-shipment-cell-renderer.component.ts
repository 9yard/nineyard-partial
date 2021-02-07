import { GridOptions, RowNode } from "@ag-grid-community/core";

import { Component } from "@angular/core";
import { ShipyardService } from "src/app/modules/shipyard/shipyard.service";

@Component({
  selector: "app-amount-in-shipment-cell-renderer",
  templateUrl: "./amount-in-shipment-cell-renderer.component.html",
  styleUrls: ["./amount-in-shipment-cell-renderer.component.scss"],
})
export class AmountInShipmentCellRendererComponent {
  params: any;
  gridApi: GridOptions;
  amount;
  amountInShipment;

  constructor(public shipyardService: ShipyardService) {}

  agInit(params: any): void {
    this.params = params;
    const index = this.getIndexInArray();
    if (index !== -1) {
      this.amount = this.shipyardService.skusToAddToShipment[index].qty;
      this.params.node.setSelected(true);
    }

    this.params.node.addEventListener(RowNode.EVENT_ROW_SELECTED, (e) => {
      if (!e.node.selected && this.amount) {
        this.amount = null;
        this.shipyardService.skusToAddToShipment.splice(
          this.getIndexInArray(),
          1
        );
      }
    });

    this.amountInShipment = this.params.data.AmountInShipment;
  }

  getIndexInArray() {
    return this.shipyardService.skusToAddToShipment
      .map((e) => e.sku)
      .indexOf(this.params.data.Sku);
  }

  inputClicked(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  amountChanged(e) {
    const obj = { sku: this.params.data.Sku, qty: e };
    const index = this.getIndexInArray();
    if (e) {
      this.params.node.setSelected(true);
    } else {
      this.params.node.setSelected(false);
    }

    if (index === -1) {
      this.shipyardService.skusToAddToShipment.push(obj);
    } else if (!e) {
      this.shipyardService.skusToAddToShipment.splice(index, 1);
    } else {
      this.shipyardService.skusToAddToShipment[index].qty = e;
    }

    console.log(this.shipyardService.skusToAddToShipment);

    this.setShipmentType();
  }

  setShipmentType() {
    if (!this.shipyardService.skusToAddToShipment.length) {
      this.shipyardService.shipmentTypeToAddToShipment = undefined;
    } else if (this.shipyardService.skusToAddToShipment.length === 1) {
      this.shipyardService.shipmentTypeToAddToShipment = this.params.data.FbaType;
    }
  }
}
