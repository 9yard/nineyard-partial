import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { OnboardingService } from "src/app/services/onboarding.service";

@Component({
  selector: "app-legal",
  templateUrl: "./legal.component.html",
  styleUrls: ["./legal.component.scss"],
})
export class LegalComponent implements OnInit {
  public termsConditionsForm: FormGroup;

  constructor(
    private onboardingService: OnboardingService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.termsConditionsForm = this.fb.group({
      IsAgree: [null, Validators.required],
    });

    this.onboardingService.UpdateOnboardingStep(2).subscribe();
  }

  public submitTermsConditionsForm() {
    const isAgree = this.termsConditionsForm.get("IsAgree").value;
    if (isAgree) {
      this.termsConditionsForm.reset();
      this.router.navigate(["/onboarding/products"]);
    }
  }

  goNext() {
    this.submitTermsConditionsForm();
  }

  goPrevious() {
    this.router.navigate(["/onboarding/welcome"])
  }
}
