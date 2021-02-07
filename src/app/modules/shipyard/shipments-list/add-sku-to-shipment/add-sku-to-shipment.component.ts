import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ShipmentDetail } from "./../../../../models/shipyard.model";
import { CdkScrollable, ScrollDispatcher } from "@angular/cdk/overlay";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { debounceTime, filter, map, tap } from "rxjs/operators";
import { HeaderService } from "src/app/components/header/header.service";

import { ShipyardService } from "./../../shipyard.service";

@Component({
  selector: "app-add-sku-to-shipment",
  templateUrl: "./add-sku-to-shipment.component.html",
  styleUrls: ["./add-sku-to-shipment.component.scss"],
})
export class AddSkuToShipmentComponent implements OnInit {
  selectedShipment: number;
  selectedShipmentPlan: number;
  private _selectedTab = "draft";
  get selectedTab() {
    return this._selectedTab;
  }
  set selectedTab(value) {
    this._selectedTab = value;
    this.startRow = 0;
    this.selectedShipment = null;
    this.selectedShipmentPlan = null;
    this.getShipments();
  }

  shipments = [];
  account;
  startRow = 0;
  amountPerPage = 50;
  loading: boolean;
  shipmentPlans: any[];
  shipmentType: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShipmentDetail,
    public dialogRef: MatDialogRef<AddSkuToShipmentComponent>,
    private shipyardService: ShipyardService,
    private headerService: HeaderService,
    private scrollDispatcher: ScrollDispatcher,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.headerService.accountsSelected.subscribe((e) => {
      this.account = e;
      this.startRow = 0;
      this.getShipments();
    });
    this.shipmentType = this.getShipmentTypeId(this.data.shipmentType);

    this.scrollDispatcher
      .scrolled()
      .pipe(
        tap((data: CdkScrollable) =>
          console.log(data.measureScrollOffset("bottom"))
        ),
        filter(
          (data: CdkScrollable) => data.measureScrollOffset("bottom") <= 1
        ),
        debounceTime(150)
      )
      .subscribe((data: CdkScrollable) => {
        this.startRow += this.amountPerPage;
        this.getShipments();
      });

    this.shipyardService
      .GetShipmentPlans(this.shipmentType)
      .subscribe((e: any[]) => {
        this.shipmentPlans = e;
      });
  }

  getShipments() {
    this.loading = true;
    this.shipyardService
      .GetShipments(
        this.account,
        this.startRow,
        this.startRow + this.amountPerPage,
        [this.selectedTab],
        this.shipmentType
      )
      .pipe(
        map((e: ShipmentDetail[]) =>
          e.filter(
            (shipment: ShipmentDetail) =>
              shipment.shipmentHeaderId !== this.data.shipmentHeaderId
          )
        )
      )
      .subscribe((array: any[]) => {
        if (!this.startRow) {
          this.shipments = [];
        }
        this.shipments.push(...array);
        this.loading = false;
        console.log(this.shipments);
      });
  }

  close() {
    this.dialogRef.close();
  }

  confrim() {
    this.loading = true;
    this.shipyardService
      .MergeShipment(
        this.data.shipmentHeaderId,
        this.selectedShipment || this.selectedShipmentPlan
      )
      .subscribe(
        (e) => {
          console.log(e);
          this.loading = false;

          this.dialogRef.close();
          this.router.navigate([
            "shipyard/shipments/" + this.selectedShipment ||
              this.selectedShipmentPlan,
          ]);
        },
        (err) => {
          this.snackBar.open("Error. Please try again", "Dismiss", {
            duration: 3000,
          });
          console.log(err);
          this.loading = false;
        }
      );
  }

  selectShipment(shipmentId) {
    this.selectedShipment = shipmentId;
  }

  selectShipmentPlan(shipmentPlanId) {
    this.selectedShipmentPlan = shipmentPlanId;
  }

  action(e) {
    if (e === "Confirm") {
      this.confrim();
    } else {
      this.close();
    }
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
