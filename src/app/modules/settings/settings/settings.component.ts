import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

import { LoginModel } from "src/app/models/login.model";

import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public routerSubs: any;
  public paramType = "shipping";
  public slideToggle = false;
  public sidebarTopic = "shipping_details";
  public sampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  public settingType = "home";
  public toggleItem = 2;
  public token: string;
  public httpOptions = { headers: new HttpHeaders({}) };
  public users: any;
  public userInfo: LoginModel;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.tabid) {
      this.settingType = this.activatedRoute.snapshot.params.tabid;
    }
    this.authService.userInfo$
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.userInfo = res;
        if (this.userInfo && this.userInfo.role !== "Admin") {
          this.authService.logout();
          this.router.navigate(["/"]);
        }
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public getInitialDetails(res) {
    console.log(res);
    this.token = res.token;
    this.httpOptions.headers = this.httpOptions.headers.append(
      "Authorization",
      `Bearer ${this.token}`
    );
    this.getAllUser();
  }

  public getAllUser() {
    const tenantId = this.authService.getTenantId();
    this.authService
      .getUsersByTenantId(tenantId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (user) => {
          this.users = user;
        },
        (err) => console.log(err)
      );
  }
}
