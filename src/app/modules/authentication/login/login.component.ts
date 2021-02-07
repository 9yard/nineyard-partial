import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";
import { LoginModel } from "src/app/models/login.model";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { StorageKeyEnum } from "src/app/core/StorageKeyEnum";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoader = false;
  public loginForm: FormGroup;
  public errorMessage: string;
  public returnUrl: string;
  public admincode: string;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.admincode = route.snapshot.paramMap.get("admincode");
  }

  ngOnInit() {
    this.errorMessage = null;
    if (this.admincode) {
      this.authService
        .loginByAdmin(this.admincode)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (value: LoginModel) => {
            localStorage.setItem(StorageKeyEnum.User, JSON.stringify(value));
            this.router.navigate(["home"]);
          },
          (err) => {
            this.errorMessage = err.error.message;
            this.initialLoad();
            this.admincode = null;
          }
        );
    } else {
      this.initialLoad();
    }
  }

  public initialLoad() {
    this.returnUrl =
      this.route.snapshot.queryParams.returnUrl || "shipyard/sku-list";
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }

    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => (this.errorMessage = null));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public login() {
    this.showLoader = true;
    this.authService
      .login(
        this.loginForm.get("username").value,
        this.loginForm.get("password").value
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (value: LoginModel) => {
         
          localStorage.setItem(StorageKeyEnum.User, JSON.stringify(value));
          if (value.onboardingStep >= 7) {
            this.router.navigate([this.returnUrl]);
            console.log('worked');
            
          }
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.showLoader = false;
        }
      );
  }
}
