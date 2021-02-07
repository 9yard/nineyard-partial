import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ToastService } from "src/app/core/toast.service";
import { duplecateNameValidator } from "src/app/directives/duplecate-name-validator";
import { AccountModel } from "src/app/models/onboarding.model";
import { OnboardingService } from "src/app/services/onboarding.service";

@Component({
  selector: "app-amazon-new-connection",
  templateUrl: "./amazon-new-connection.component.html",
  styleUrls: [
    "../new-connection.scss",
    "./amazon-new-connection.component.scss",
  ],
})
export class AmazonNewConnectionComponent implements OnInit {
  public addAccountForm: FormGroup;
  amazonMarkets;
  @Output() saved: EventEmitter<boolean> = new EventEmitter();
  private destroy$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private onboardingService: OnboardingService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getAmazonAccounts();

    this.addAccountForm = this.fb.group({
      name: [
        "",
        [Validators.required],
        [duplecateNameValidator(this.onboardingService)],
      ],
      marketPlace: ["", [Validators.required]],
      seller: ["", [Validators.required]],
      token: ["", [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  openAmazonMWSPage() {
    this.onboardingService.AmazonLink().subscribe((res) => {
      window.open(res, "_blank");
    });
  }

  saveNewMarketplace() {
    this.verifyCredentials();
  }

  getAmazonAccounts() {
    this.onboardingService.AmazonMarkets().subscribe((res) => {
      this.amazonMarkets = res;
    });
  }

  verifyCredentials() {
    const amazonCredentials = this.addAccountForm.value;
    console.log(amazonCredentials);

    this.onboardingService
      .verifyCredential(amazonCredentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean[]) => {
        if (res.every(item => item === true)) {
          this.onboardingService
            .InsertAccount(amazonCredentials as AccountModel)
            .subscribe(() => {
              this.toastService.showToaster("Your Amazon account was linked successfully")
              this.saved.emit(true);
            });
        } else {
          this.toastService.showErrorToaster("Please check your credentials");
        }
      });
  }
}
