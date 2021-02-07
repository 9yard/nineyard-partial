import { MatSnackBar } from "@angular/material/snack-bar";
import { ShipmentDetail } from "./../../../../models/shipyard.model";
import { Subject } from "rxjs/internal/Subject";
import { Router } from "@angular/router";
import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { merge, Observable } from "rxjs";
import { debounceTime, map, switchMap, tap } from "rxjs/operators";

import { ShipmentPlan } from "src/app/models/shipyard.model";

import { ShipyardService } from "../../shipyard.service";
import { HeaderService } from "src/app/components/header/header.service";

@Component({
  selector: "app-plan-shipment-dialog",
  templateUrl: "./plan-shipment-dialog.component.html",
  styleUrls: ["./plan-shipment-dialog.component.scss"],
})
export class PlanShipmentDialogComponent implements OnInit {
  actions = [];
  isDraft = true;
  shipmentPlan: ShipmentPlan[];
  filteredOptions$: Observable<any>;
  filteredOptionsArray: any[] = [];
  isFormValid;
  loading: Subject<boolean> = new Subject();
  account;

  get skus() {
    return this.planShipmentForm.get("skus") as FormArray;
  }
  public planShipmentForm: FormGroup = new FormGroup({
    ShipmentType: new FormControl(0, Validators.required),
    fromWareHouseId: new FormControl("", Validators.required),
    skus: new FormArray([]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PlanShipmentDialogComponent>,
    private shipyardService: ShipyardService,
    private router: Router,
    private headerService: HeaderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.data.isDraft) {
      this.actions.push(
        { text: "Cancel", buttonStyle: "underline" },
        { text: "Create Draft", isDisabled: !this.planShipmentForm.valid }
      );
      const shipmentTypeControl = this.planShipmentForm.get("ShipmentType");
      shipmentTypeControl.setValue(
        this.getShipmentTypeId(this.shipyardService.shipmentTypeToAddToShipment)
      );
      shipmentTypeControl.disable();
    } else {
      this.addSkuToForm(0);
      this.actions.push(
        { text: "Cancel", buttonStyle: "underline" },
        { text: "Plan Shipment", isDisabled: !this.planShipmentForm.valid }
      );
    }
    this.headerService.accountsSelected.subscribe((e) => (this.account = e));
    this.isFormValid = merge(this.planShipmentForm.statusChanges, this.loading)
      .pipe(map((e) => (e === "VALID" ? false : true)))
      .subscribe((e) => {
        if (!e) {
          if (this.actions[1].isDisabled) {
            this.actions[1].isDisabled = false;
          }
        } else {
          if (!this.actions[1].isDisabled) {
            this.actions[1].isDisabled = true;
          }
        }
      });
  }

  addSkuToForm(index) {
    const group = new FormGroup({
      sku: new FormControl("", Validators.required),
      qty: new FormControl("", [Validators.min(1), Validators.required]),
    });

    this.skus.push(group);
    this.manageSkuAutocomplete(index);
  }

  removeSkuToForm(index) {
    this.skus.removeAt(index);
  }

  dialogAction(e) {
    if (e === "Plan Shipment") {
      this.loading.next(true);
      this.planShipment();
    } else if (e === "Create Draft") {
      this.createDraft();
    } else if (e === "Replan") {
      this.shipmentPlan = null;
      this.actions = [
        { text: "Cancel", buttonStyle: "underline" },
        { text: "Plan Shipment", isDisabled: !this.planShipmentForm.valid },
      ];
    } else if (e === "Confirm" && this.shipmentPlan) {
      this.loading.next(true);
      this.confirmShipmentPlan();
    } else if (e === "Cancel") {
      this.dialogRef.close();
    }
  }
  close() {
    this.dialogRef.close();
  }

  manageSkuAutocomplete(index: number) {
    this.filteredOptionsArray[index] = [];
    this.filteredOptionsArray[index] = this.skus.at(index).valueChanges.pipe(
      map((e) => e.sku),
      debounceTime(300),
      tap((e) => console.log(e)),
      switchMap((value) =>
        this.shipyardService.TypeaheadSku(
          this.account[0],
          value,
          this.planShipmentForm.value.ShipmentType
        )
      )
    );
  }

  createDraft() {
    this.shipyardService
      .CreateShipmentDraft(
        this.account[0],
        this.planShipmentForm.getRawValue().ShipmentType,
        this.planShipmentForm.value.fromWareHouseId.id,
        this.shipyardService.skusToAddToShipment
      )
      .subscribe(
        (e: ShipmentDetail) => {
          this.dialogRef.close();
          this.shipyardService.skusToAddToShipment = [];
          this.router.navigate(["shipyard/shipments/" + e.shipmentHeaderId]);
        },
        (err) => {
          this.snackBar.open("Error. Please try again", "Dismiss", {
            duration: 3000,
          });
          console.log(err);
        }
      );
  }

  planShipment() {
    const formValue = {
      ...this.planShipmentForm.value,
      ShipmentType: +this.planShipmentForm.value.ShipmentType,
      fromWareHouseId: this.planShipmentForm.value.fromWareHouseId,
    };
    this.shipyardService.PlanShip(formValue).subscribe(
      (e: { errors: any[]; shipmentPlans: ShipmentPlan[] }) => {
        this.loading.next(false);
        this.actions = [
          { text: "Replan", buttonStyle: "underline" },
          { text: "Confirm" },
        ];
        this.shipmentPlan = e.shipmentPlans;
      },
      (err) => {
        this.loading.next(false);
        this.snackBar.open("Error. Please try again", "Dismiss", {
          duration: 3000,
        });
        console.log(err);
      }
    );
  }

  confirmShipmentPlan() {
    this.shipyardService
      .ConfirmShipment(this.shipmentPlan[0].shipmentPlanHeaderId)
      .subscribe(
        (e) => {
          this.loading.next(false);
          this.dialogRef.close();
          this.router.navigate(["shipyard/shipments/" + e[0]]);
        },
        (err) => {
          this.loading.next(false);
          this.snackBar.open("Error. Please try again", "Dismiss", {
            duration: 3000,
          });
          console.log(err);
        }
      );
  }

  getShipmentTypeId(shipmentType) {
    switch (shipmentType) {
      case "Standard":
        return 0;
      case "Oversized":
        return 1;
      case "Hazmat":
        return 2;
      case "Small & Light":
        return 3;
      default:
        return "";
    }
  }
}
