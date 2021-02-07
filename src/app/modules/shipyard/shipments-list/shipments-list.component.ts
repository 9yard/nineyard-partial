import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CdkScrollable, ScrollDispatcher } from "@angular/cdk/overlay";

import { debounceTime, takeUntil, tap } from "rxjs/operators";

import { HeaderService } from "src/app/components/header/header.service";

import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";

import { FilterDropdownComponent } from "src/app/components/filter-dropdown/filter-dropdown.component";
import { SettingsService } from "src/app/services/settings.service";

import { ShipyardService } from "./../shipyard.service";

import { PlanShipmentDialogComponent } from "./plan-shipment-dialog/plan-shipment-dialog.component";

@Component({
  selector: "app-shipments-list",
  templateUrl: "./shipments-list.component.html",
  styleUrls: ["./shipments-list.component.scss"],
})
export class ShipmentsListComponent implements OnInit, OnDestroy {
  shipments = [];
  account;
  @ViewChild("filterButton") filterButton: ElementRef;
  startRow = 0;
  amountPerPage = 50;
  loading: boolean;
  private _selectedTab = "draft";
  private destroy$ = new Subject<void>();

  get selectedTab() {
    return this._selectedTab;
  }
  set selectedTab(value) {
    this._selectedTab = value;
    this.startRow = 0;
    this.getShipments();
  }

  constructor(
    private dialog: MatDialog,
    private shipyardService: ShipyardService,
    private headerService: HeaderService,
    private scrollDispatcher: ScrollDispatcher,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.headerService.accountsSelected
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => {
        this.account = e;
        this.startRow = 0;
        this.getShipments();
      });
    // need to finsh
    this.scrollDispatcher
      .scrolled()
      .pipe(
        takeUntil(this.destroy$),
        filter(
          (data: CdkScrollable) => data.measureScrollOffset("bottom") <= 1
        ),
        debounceTime(150)
      )
      .subscribe((data: CdkScrollable) => {
        this.startRow += this.amountPerPage;
        this.getShipments();
      });

    this.headerService.remoteActionBroadcaster
      .pipe(
        takeUntil(this.destroy$),
        filter((e) => e === "DownloadShipments")
      )
      .subscribe((e) => {
        this.startRow = 0;
        this.getShipments();
      });

    this.headerService.title.next("Shipments List");
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  getShipments() {
    this.loading = true;
    this.shipyardService
      .GetShipments(
        this.account,
        this.startRow,
        this.startRow + this.amountPerPage,
        [this.selectedTab]
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((array: any[]) => {
        if (!this.startRow) {
          this.shipments = [];
        }
        this.shipments.push(...array);
        this.loading = false;
      });
  }

  planShipment() {
    this.dialog.open(PlanShipmentDialogComponent, {
      width: "600px",
      data: {
        warehouses$: this.settingsService.GetAllWarehouses(),
        isDraft: false,
        title: "Plan Shipment",
      },
    });
  }
  // account, shipmentType, fromWarehouse

  openFilter() {
    const leftOfset = this.filterButton.nativeElement.offsetLeft;
    const topOfset = this.filterButton.nativeElement.offsetTop;

    this.dialog.open(FilterDropdownComponent, {
      backdropClass: "cdk-overlay-transparent-backdrop",
      panelClass: "process-dialog",
      width: "160px",
      position: {
        top: topOfset + 28 + "px",
        left: leftOfset - 65 + "px",
      },
    });
  }

  statusTrackByFunction(index, status) {
    return status ? status.name : undefined;
  }

  shipmentTrackByFunction(index, shipment) {
    return shipment ? shipment.shipmentHeaderId : undefined;
  }

  importShipments() {
    this.shipyardService
      .DownloadShipments(this.account)
      .subscribe((e) => console.log(e));
  }
}
