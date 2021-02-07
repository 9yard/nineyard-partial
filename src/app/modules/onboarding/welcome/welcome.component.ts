import { Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { StorageKeyEnum } from "src/app/core/StorageKeyEnum";
import { LoginModel } from "src/app/models/login.model";
import { OnboardingService } from "src/app/services/onboarding.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  username: string;
  private destroy$ = new Subject<void>();
  constructor(
    private onboardingService: OnboardingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(
      localStorage.getItem(StorageKeyEnum.User)
    ) as LoginModel;
    this.username = user.username;

    this.onboardingService.UpdateOnboardingStep(1).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  goNext() {
    this.router.navigate(["/onboarding/terms"]);
  }
}
