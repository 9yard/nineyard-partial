import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { OnboardingService } from "../../../services/onboarding.service";
import { SettingsService } from "../../../services/settings.service";

@Component({
  selector: "app-edit-warehouse",
  templateUrl: "./edit-warehouse.component.html",
  styleUrls: ["./edit-warehouse.component.scss"],
})
export class EditWarehouseComponent implements OnInit, OnDestroy {
  public warehouseForm = this.fb.group({
    Id: ["", Validators.required],
    Name: [""],
    Addressln1: [""],
    Addressln2: [""],
    City: [""],
    State: [""],
    Postal: [null],
    Country: [""],
    CountryCode: [""],
    Priority: [2],
    Isfba: [true],
    Isfbm: [false],
    Isvendor: [0],
    Picktp: [0],
    Ispicking: [1],
    Isfbmenonly: [0],
  });
  public uniqueId = false;
  public loadingUniqueId = false;
  public checkedUniqueId = false;
  public setTimeoutInter: any;
  private destroy$ = new Subject<void>();
  public availableWherehouses = [];
  public stateStore: any[];
  public states: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditWarehouseComponent>,
    private fb: FormBuilder,
    private onboardingService: OnboardingService,
    private settingsService: SettingsService,
  ) {}

  ngOnInit() {
    if (this.data.type === "edit") {
      const tempArray = Object.keys(this.data);
      if (tempArray.indexOf("addName") > -1) {
        tempArray.splice(tempArray.indexOf("addName"), 1);
      }
      let tempObject: any = {};
      tempArray.forEach((key, index) => {
        if (index !== 0) {
          tempObject = {
            ...tempObject,
            ...{
              [key.split("")[0].toUpperCase() +
              key.split("").slice(1).join("")]: this.data[key],
            },
          };
        }
      });
      tempObject = {
        ...tempObject,
        ...{
          Isfba: this.numberToBoolean(tempObject.Isfba),
          Isfbm: this.numberToBoolean(tempObject.Isfbm),
        },
      };
      this.warehouseForm.setValue(tempObject);
    }
    this.getStates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
  getStates = () => {
    this.onboardingService.getStates().subscribe((data: any[]) => {
      this.stateStore = [...data];
      this.states = [...data];
    });
  };
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

  public warehouseFormSubmit() {
    const tempData = this.warehouseForm.value;
    const formData = {
      ...tempData,
      ...{
        Isfba: this.booleanToNumber(tempData.Isfba),
        Isfbm: this.booleanToNumber(tempData.Isfbm),
      },
    };
    console.log(formData);
    this.onboardingService
      .InsertWarehouse(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        this.settingsService
          .GetAllWarehouses()
          .pipe(takeUntil(this.destroy$))
          .subscribe((resData) => {
            console.log(resData);
            this.dialogRef.close(true);
          });
      });
  }

  public updateWarehouseFormSubmit() {
    const tempData = this.warehouseForm.value;
    const formData = {
      ...tempData,
      ...{
        Isfba: this.booleanToNumber(tempData.Isfba),
        Isfbm: this.booleanToNumber(tempData.Isfbm),
      },
    };
    console.log(formData);
    this.settingsService
      .UpdateWh(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        this.settingsService
          .GetAllWarehouses()
          .pipe(takeUntil(this.destroy$))
          .subscribe((resData) => {
            console.log(resData);
            this.dialogRef.close(true);
          });
      });
  }

  public checkId($e) {
    const value = $e.target.value;
    this.uniqueId = false;
    this.checkedUniqueId = false;
    this.loadingUniqueId = true;
    if (value !== "") {
      clearTimeout(this.setTimeoutInter);
      this.setTimeoutInter = setTimeout(() => {
        this.settingsService
          .GetWarehouse(value)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data) => {
              this.loadingUniqueId = false;
              if (data === null) {
                this.uniqueId = true;
                this.checkedUniqueId = true;
              } else {
                this.uniqueId = false;
                this.checkedUniqueId = true;
              }
            },
            (err) => {
              this.loadingUniqueId = false;
            }
          );
      }, 1000);
    }
  }

  public booleanToNumber = (data) => (data === false ? 0 : 1);

  public numberToBoolean = (data) => (data === 0 ? false : true);
}
