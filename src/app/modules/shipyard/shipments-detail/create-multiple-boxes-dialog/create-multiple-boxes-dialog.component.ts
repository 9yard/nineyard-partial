import { Component, Inject, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ShipmentSku } from "src/app/models/shipyard.model";

@Component({
  selector: "app-create-multiple-boxes-dialog",
  templateUrl: "./create-multiple-boxes-dialog.component.html",
  styleUrls: ["./create-multiple-boxes-dialog.component.scss"],
})
export class CreateMultipleBoxesDialogComponent implements OnInit {
  createBoxesForm: FormGroup = new FormGroup({
    amount: new FormControl("", []),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ShipmentSku,
    public dialogRef: MatDialogRef<CreateMultipleBoxesDialogComponent>
  ) {}

  ngOnInit(): void {
    this.createBoxesForm.controls["amount"].setValue(
      this.data.qty - this.data.totalBoxed
    );
    this.createBoxesForm.controls["amount"].setValidators([
      Validators.required,
      Validators.max(this.data.qty - this.data.totalBoxed),
      Validators.min(0),
    ]);
    this.createBoxesForm.addControl(
      "amountPerBox",
      new FormControl("", [
        Validators.required,
        (control: AbstractControl) =>
          Validators.max(this.createBoxesForm.value.amount)(control),
        Validators.min(0),
      ])
    );
  }

  action(event) {
    if (event === "Confirm") {
      this.dialogRef.close(this.createBoxesForm.value);
    } else {
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
