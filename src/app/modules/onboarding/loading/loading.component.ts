import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { StorageKeyEnum } from "src/app/core/StorageKeyEnum";
import { OnboardingService } from "src/app/services/onboarding.service";
@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
})
export class LoadingComponent implements OnInit {
  private destroy$ = new Subject<void>();
  public i = 0;
  constructor(
    private onboardingService: OnboardingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onboardingService.UpdateOnboardingStep(7).subscribe();
    this.timeOut();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  goNext() {
    this.router.navigate(["/"]);
  }

  goPrevious() {
    this.router.navigate(["/onboarding/connect-accounts"]);
  }

  timeOut() {
    setTimeout(() => {
      this.i = this.i + 1;
      if (this.i < 4) {
        this.timeOut();
      }
    }, 5000);
  }
}
