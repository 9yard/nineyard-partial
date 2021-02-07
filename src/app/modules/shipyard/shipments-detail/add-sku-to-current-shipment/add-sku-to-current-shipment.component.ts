import { HeaderService } from "src/app/components/header/header.service";
import { UpdateSkuQtyComponent } from "./../update-sku-qty/update-sku-qty.component";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { Observable } from "rxjs";
import { filter, switchMap, tap } from "rxjs/operators";

import { ShipyardService } from "./../../shipyard.service";
import { ShipmentSku } from "./../../../../models/shipyard.model";

@Component({
  selector: "app-add-sku-to-current-shipment",
  templateUrl: "./add-sku-to-current-shipment.component.html",
  styleUrls: ["./add-sku-to-current-shipment.component.scss"],
})
export class AddSkuToCurrentShipmentComponent implements OnInit {
  selectedSKUs: ShipmentSku[] = [];
  skuForm: FormGroup = new FormGroup({
    skuAutocomplete: new FormControl(),
    skuQty: new FormControl(1),
  });
  filteredOptions$: Observable<any>;
  account;
  constructor(
    public dialogRef: MatDialogRef<AddSkuToCurrentShipmentComponent>,
    private shipyardService: ShipyardService,
    private dialog: MatDialog,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.filteredOptions$ = this.skuForm
      .get("skuAutocomplete")
      .valueChanges.pipe(
        tap((e) => console.log(e)),
        switchMap((value) =>
          this.shipyardService.TypeaheadSku(this.account, value)
        )
      );

    this.headerService.accountsSelected.subscribe((e) => (this.account = e[0]));
  }

  action(e) {
    if (e === "Confirm") {
      this.dialogRef.close(
        this.selectedSKUs.map((e: ShipmentSku) => {
          return {
            sku: e.sku,
            qty: e.qty,
          };
        })
      );
    } else {
      this.dialogRef.close();
    }
  }

  loadSku() {
    console.log(this.skuForm.value);
    const sku = this.skuForm.value.skuAutocomplete;
    sku.qty = this.skuForm.value.skuQty;

    this.selectedSKUs.push(sku as ShipmentSku);
    this.skuForm.reset();
    this.skuForm.get("skuQty").setValue(1);
  }

  displayWith(value: ShipmentSku) {
    if (value) {
      return value.sku;
    }
  }

  updateQty(sku) {
    this.dialog
      .open(UpdateSkuQtyComponent, {
        data: {
          title: "Update Quantity",
          inputLabel: "New Quantity",
        },
      })
      .afterClosed()
      .pipe(filter((e) => e))
      .subscribe((e) => {});
  }

  removeSku(sku) {
    this.selectedSKUs = this.selectedSKUs.filter(
      (currentSku) => sku.sku !== currentSku.sku
    );
  }
}
