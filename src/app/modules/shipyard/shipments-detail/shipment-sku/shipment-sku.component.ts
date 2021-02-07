import { UpdateSkuQtyComponent } from "./../update-sku-qty/update-sku-qty.component";
import { ShipmentBox, ShipmentSku } from "./../../../../models/shipyard.model";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: "app-shipment-sku",
  templateUrl: "./shipment-sku.component.html",
  styleUrls: ["./shipment-sku.component.scss"],
})
export class ShipmentSkuComponent implements OnInit {
  errorMessage: string;
  @Input() sku: ShipmentSku;
  @Input() highlighted: boolean;
  @Input() isLast: boolean;
  @Input() boxes: ShipmentBox[];
  @Input() canBox: boolean;
  @Input() actionMenu: MatMenu;
  @Input() printMenu: MatMenu;
  @Input() addToBoxMenu: MatMenu;
  @Input() box: any;
  @Input() canEdit: any;
  @Output() itemSelectedEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleErrorDialogEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.errorMessage = this.sku.shipmentErrors
      ? this.sku.shipmentErrors.map((e) => e.errorMessage).join(" \n ")
      : "";
  }

  itemSelected(sku) {
    this.itemSelectedEvent.emit(sku);
  }
  toggleErrorDialog(open: boolean) {
    this.toggleErrorDialogEvent.emit(open);
  }
}
