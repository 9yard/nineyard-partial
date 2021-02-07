import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { ToastService } from "src/app/core/toast.service";
import { SettingsService } from "src/app/services/settings.service";

@Component({
  selector: "app-system-settings",
  templateUrl: "./system-settings.component.html",
  styleUrls: ["./system-settings.component.scss"],
})
export class SystemSettingsComponent implements OnInit {
  public boxLabelPrinterForm: FormGroup;
  public skuLabelPrinterForm: FormGroup;
  public printers: string[];
  public loading: any = {};
  public includedFnSku = false;
  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.boxLabelPrinterForm = this.fb.group({
      printer: [null, Validators.required],
      width: [null, Validators.required],
      height: [null, Validators.required],
    });

    this.skuLabelPrinterForm = this.fb.group({
      printer: [null, Validators.required],
      width: [null, Validators.required],
      height: [null, Validators.required],
    });

    this.boxLabelPrinterForm.get("width").valueChanges.subscribe((value) => {
      if (value > 12) {
        this.boxLabelPrinterForm.get("width").setValue(12);
      }
      if (value < 0) {
        this.boxLabelPrinterForm.get("width").setValue(0);
      }
    });

    this.boxLabelPrinterForm.get("height").valueChanges.subscribe((value) => {
      if (value > 8) {
        this.boxLabelPrinterForm.get("height").setValue(8);
      }
      if (value < 0) {
        this.boxLabelPrinterForm.get("height").setValue(0);
      }
    });

    this.skuLabelPrinterForm.get("width").valueChanges.subscribe((value) => {
      if (value > 12) {
        this.skuLabelPrinterForm.get("width").setValue(12);
      }
      if (value < 0) {
        this.skuLabelPrinterForm.get("width").setValue(0);
      }
    });

    this.skuLabelPrinterForm.get("height").valueChanges.subscribe((value) => {
      if (value > 8) {
        this.skuLabelPrinterForm.get("height").setValue(8);
      }
      if (value < 0) {
        this.skuLabelPrinterForm.get("height").setValue(0);
      }
    });

    this.settingsService
      .GetAllPrinters()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: string[]) =>
          (this.printers = ["Preview in browser", "Save as pdf"])
      );
    this.settingsService
      .GetSelectedPrinter()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        data.forEach((el) => {
          if (el.printerType === 1) {
            this.skuLabelPrinterForm.patchValue(el);
          } else if (el.printerType === 2) {
            this.boxLabelPrinterForm.patchValue(el);
          }
        });
      });
    this.settingsService
      .GetIncludeFnSkuOnPrint()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: boolean) => (this.includedFnSku = data));
  }

  public saveLabelPrinter(type: string) {
    if (type === "box") {
      this.loading.box = true;
      const fVal = this.boxLabelPrinterForm.value;
      this.settingsService
        .SavePrinter(fVal.printer, +fVal.width, +fVal.height, 2)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loading.box = false;
            this.toastService.showToaster("Printer saved successfully");
          },
          () => (this.loading.box = false)
        );
    }

    if (type === "sku") {
      this.loading.sku = true;
      const fVal = this.skuLabelPrinterForm.value;
      this.settingsService
        .SavePrinter(fVal.printer, +fVal.width, +fVal.height, 1)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loading.sku = false;
            this.toastService.showToaster("Printer saved successfully");
          },
          () => (this.loading.sku = false)
        );
    }
  }

  public includedFnSkuClick() {
    this.settingsService
      .IncludeFnSkuOnPrint(this.includedFnSku)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.toastService.showToaster("Setting updated successfully"),
        () => this.toastService.showErrorToaster("Something went wrong")
      );
  }
}
