import { ShipmentSku } from "./../../../../models/shipyard.model";
import { FormControl, Validators } from "@angular/forms";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-update-sku-qty",
  templateUrl: "./update-sku-qty.component.html",
  styleUrls: ["./update-sku-qty.component.scss"],
})
export class UpdateSkuQtyComponent implements OnInit {
  qtyInput: FormControl;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      description?: string;
      inputLabel: string;
      sku: ShipmentSku;
      prefilQty: number;
      maxQty: number;
      minQty: number;
    },
    public dialogRef: MatDialogRef<UpdateSkuQtyComponent>
  ) {}

  ngOnInit(): void {
    this.qtyInput = new FormControl(this.data.prefilQty, [
      Validators.required,
      Validators.max(this.data.maxQty),
      Validators.min(this.data.minQty || 0),
    ]);
  }

  action(event) {
    if (event === "Confirm") {
      this.dialogRef.close(this.qtyInput.value);
    } else {
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
