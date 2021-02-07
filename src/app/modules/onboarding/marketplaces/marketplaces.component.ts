import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { OnboardingService } from "src/app/services/onboarding.service";
import { SettingsService } from "src/app/services/settings.service";

import { AccountByType } from "./../../../models/account.model";
import { LoginModel } from "src/app/models/login.model";
@Component({
  selector: "app-marketplaces",
  templateUrl: "./marketplaces.component.html",
  styleUrls: ["./marketplaces.component.scss"],
})
export class MarketplacesComponent implements OnInit {
  accounts$: Observable<AccountByType>;
  accountsCount: number = 0;
  userInfo: LoginModel;

  marketplaces = [
    {
      name: "Amazon",
      connectedAccount: [],
    },
  ];

  constructor(
    private onboardingService: OnboardingService,
    private router: Router,
    private settingsService: SettingsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.userInfo$.subscribe((res) => {
      this.userInfo = res;
      if (this.userInfo.isPriceyard) {
        this.marketplaces.push({
          name: "Walmart",
          connectedAccount: [],
        });
      }
      this.getAccounts();
    });
    this.onboardingService.UpdateOnboardingStep(5).subscribe();
  }

  goNext() {
    this.router.navigate(["/onboarding/other-settings"]);
  }

  goPrevious() {
    this.router.navigate(["/onboarding/billing"]);
  }

  getAccounts() {
    this.settingsService.GetAccountsByType().subscribe((accounts: any) => {
      accounts.forEach((element) => {
        this.marketplaces.forEach((marketplace) => {
          if (element.type == marketplace.name) {
            this.accountsCount++;
            marketplace.connectedAccount.push(element);
          }
        });
      });
    });
  }

  refreshAccounts() {
    this.marketplaces.forEach(
      (marketplace) => (marketplace.connectedAccount = [])
    );
    this.getAccounts();
  }
}
