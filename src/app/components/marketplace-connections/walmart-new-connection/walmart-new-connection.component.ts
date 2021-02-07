import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ToastService } from "src/app/core/toast.service";
import { duplecateNameValidator } from "src/app/directives/duplecate-name-validator";
import { AddWalmartAccount } from "src/app/models/onboarding.model";
import { OnboardingService } from "src/app/services/onboarding.service";

@Component({
  selector: "app-walmart-new-connection",
  templateUrl: "./walmart-new-connection.component.html",
  styleUrls: [
    "../new-connection.scss",
    "./walmart-new-connection.component.scss",
  ],
})
export class WalmartNewConnectionComponent implements OnInit {
  public addAccountForm: FormGroup;
  @Output() saved: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private onboardingService: OnboardingService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.addAccountForm = this.fb.group({
      name: [
        "",
        [Validators.required],
        [duplecateNameValidator(this.onboardingService)],
      ],
      key: ["", [Validators.required]],
      secret: ["", [Validators.required]],
    });
  }

  openWalmartPage() {
    window.open("https://developer.walmart.com/generateKey", "_blank");
  }

  saveNewMarketplace() {
    this.onboardingService
      .AddWalmartAccount(this.addAccountForm.value as AddWalmartAccount)
      .subscribe((e) => {
        if (!e) {
          this.toastService.showErrorToaster("Please check your credentials");
        } else {
          this.toastService.showToaster("Your Walmart account was linked successfully")
          this.saved.emit(true);
        }
      });
  }
}
