import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CreditCardValidators } from "angular-cc-library";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { ToastService } from "src/app/core/toast.service";
import { BillingInfoModel } from "src/app/models/onboarding.model";
import { OnboardingService } from "src/app/services/onboarding.service";

@Component({
  selector: "app-billing",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.scss"],
})
export class BillingComponent implements OnInit {
  public ccForm: FormGroup;
  private destroy$ = new Subject<void>();
  public submittingCc: boolean;
  price: number;
  constructor(
    private fb: FormBuilder,
    private onboardingService: OnboardingService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.ccForm = this.fb.group({
      tenantId: [this.onboardingService.userInfo.tenantId],
      userId: [this.onboardingService.userInfo.userId],
      name: ["", [Validators.required]],
      creditCardNumber: [
        "",
        [Validators.required, CreditCardValidators.validateCCNumber],
      ],
      expirationDate: [
        "",
        [Validators.required, CreditCardValidators.validateExpDate],
      ],
      cvc: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
    });

    this.price = this.onboardingService.price;
    this.onboardingService.UpdateOnboardingStep(4).subscribe();
  }

  ccFormSubmit() {
    const data = this.ccForm.value as BillingInfoModel;
    this.submittingCc = true;
    this.onboardingService
      .InsertBillingInfo(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.submittingCc = false;
        if (!res.body) {
          this.ccForm.reset();
          this.router.navigate(["/onboarding/connect-marketplaces"]);
        } else {
          this.toastService.showErrorToaster(res.body);
        }
      });
  }

  goNext() {
    this.ccFormSubmit();
  }

  goPrevious() {
    this.router.navigate(["/onboarding/products"]);
  }
}
