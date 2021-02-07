import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivationEnd } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { StorageKeyEnum } from "./core/StorageKeyEnum";
import { ToastService } from "./core/toast.service";
import { AuthService } from "./services/auth.service";
import { PrintService } from "./services/print.service";
import { HeaderService } from "./components/header/header.service";
import { ToasterComponent } from "./components/toaster/toaster.component";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = "datavanced";
  public toast: boolean;
  public message: string;
  public toastInterval: any;
  public show = true;
  public isErr = false;
  private destroy$ = new Subject<void>();
  isNavVisable: boolean;
  isNavCollapsed: boolean;
  parentRouteName: string;
  constructor(
    toastService: ToastService,
    public printService: PrintService,
    private titleService: Title,
    private authService: AuthService,
    public router: Router,
    private snackbar: MatSnackBar,
    private headerService: HeaderService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        this.parentRouteName = event.snapshot.url.length
          ? event.snapshot.url[0].path
          : "empty";
        if (
          this.parentRouteName === "account" ||
          this.parentRouteName === "onboarding"
        ) {
          this.isNavVisable = false;
        } else {
          this.isNavVisable = true;
        }

        const admincode = event.snapshot.paramMap.get("admincode");
        if (admincode) {
          authService.logout();
        }

        const index =
          this.getTitle(router.routerState, router.routerState.root).length - 1;
        const title = this.getTitle(
          router.routerState,
          router.routerState.root
        )[index];
        this.titleService.setTitle(`nineyard-${title}`);
        this.headerService.title.next(title);
      }
    });

    this.authService.userInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.checkOnboarding(res);
      });

    toastService.mtoast.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.openToaster(false, value);
      }
    });

    toastService.mtoastErr.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.openToaster(true, value);
      }
    });

    router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!this.show) {
          this.show = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.checkForValidToken();
  }

  onActivate(event) {
    window.scroll(0, 0);
    if (
      document.getElementsByClassName("cdk-overlay-backdrop-showing").length !==
      0
    ) {
      const backdrop = document.getElementsByClassName(
        "cdk-overlay-backdrop-showing"
      )[0] as HTMLElement;
      backdrop.click();
    }
  }

  openToaster(isErr, value, duration = 3000) {
    this.snackbar.openFromComponent(ToasterComponent, {
      data: {
        isErr: isErr,
        message: value,
      },
      duration: duration,
      panelClass: "custom-toaster",
    });
  }

  public closeToast() {
    clearTimeout(this.toastInterval);
    this.toast = false;
    this.message = null;
  }

  private getTitle(state: any, parent: any) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  private checkForValidToken() {
    const userString = localStorage.getItem(StorageKeyEnum.User);
    if (userString) {
      const userObj = JSON.parse(userString);
      const dateNow = new Date();
      const loginExpireDate = new Date(userObj.tokenExpire);
      const isExprired = loginExpireDate < dateNow;
      if (isExprired) {
        localStorage.removeItem(StorageKeyEnum.User);
      }
    }
  }

  checkOnboarding(userInfo) {
    if (userInfo) {
      if (!userInfo.onboardingStep || userInfo.onboardingStep === 1) {
        this.router.navigate(["/onboarding/welcome"]);
      } else if (userInfo.onboardingStep === 2) {
        this.router.navigate(["/onboarding/terms"]);
      } else if (
        userInfo.onboardingStep === 3 ||
        userInfo.onboardingStep === 4
      ) {
        this.router.navigate(["/onboarding/products"]);
      } else if (userInfo.onboardingStep === 5) {
        this.router.navigate(["/onboarding/connect-marketplaces"]);
      } else if (userInfo.onboardingStep === 6) {
        // this.router.navigate(["/onboarding/other-settings"]);
      }
    }
  }
}
