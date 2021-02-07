import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { of, Subject } from "rxjs";
import { debounceTime, mergeMap, takeUntil } from "rxjs/operators";

import { WarehouseModel } from "src/app/models/onboarding.model";
import { OnboardingService } from "src/app/services/onboarding.service";
import { ShipmentService } from "src/app/services/shipment.service";
@Component({
  selector: "app-other-settings",
  templateUrl: "./other-settings.component.html",
  styleUrls: ["./other-settings.component.scss"],
})
export class OtherSettingsComponent implements OnInit {
  private destroy$ = new Subject<void>();
  public warehouseForm: FormGroup;
  public warehouseIdError = false;
  fb: FormBuilder = new FormBuilder();
  @ViewChild("stateSearchInput", { static: false }) stateInput: ElementRef;

  public stateStore: any[];
  public states: any[];

  constructor(
    private onboardingService: OnboardingService,
    private router: Router,
    private shipmentService: ShipmentService
  ) {}

  ngOnInit(): void {
    this.onboardingService.UpdateOnboardingStep(6).subscribe();
    this.warehouseForm = this.fb.group({
      Id: [null, Validators.required],
      Name: [null, Validators.required],
      Addressln1: [null, Validators.required],
      Addressln2: [null],
      City: [null, Validators.required],
      State: [null, Validators.required],
      Postal: [null, Validators.required],
      Country: ["United States", Validators.required],
      CountryCode: ["US", Validators.required],
    });
    this.warehouseForm
      .get("Id")
      .valueChanges.pipe(
        debounceTime(1000),
        mergeMap((value: string) => {
          if (value) {
            return this.shipmentService.IsDuplicateWh(value);
          } else {
            return of(false);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((value: boolean) => (this.warehouseIdError = value));

    this.onboardingService.getStates().subscribe((data: any[]) => {
      this.stateStore = [...data];
      this.states = [...data];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public stateSearchClicked() {
    this.stateInput.nativeElement.focus();
    setTimeout(() => {
      this.stateInput.nativeElement.focus();
    }, 100);
  }

  public submitwarehouseForm() {
    const data = this.warehouseForm.value as WarehouseModel;
    this.onboardingService
      .InsertWarehouse(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(["/onboarding/loading"]);
        this.warehouseForm.reset({
          Country: "United States",
          CountryCode: "US",
        });
      });
  }

  goNext() {
    this.submitwarehouseForm();
  }

  goPrevious() {
    this.router.navigate(["/onboarding/connect-marketplaces"])
  }

  public filterStates(value: string) {
    if (value) {
      this.states = [
        ...this.stateStore.filter(
          (x) => x.name.toLowerCase().indexOf(value) > -1
        ),
      ];
    } else {
      this.states = [...this.stateStore];
    }
  }
}
