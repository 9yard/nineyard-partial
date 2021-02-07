import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { AuthService } from "src/app/services/auth.service";
import { LoginModel } from "src/app/models/login.model";
import { InventoryService } from "src/app/services/inventory.service";

import { filter } from "rxjs/operators";

import navRoutes, { navRoute } from "./nav-routes";

@Component({
  selector: "app-common-sidebar",
  templateUrl: "./common-sidebar.component.html",
  styleUrls: ["./common-sidebar.component.scss"],
})
export class CommonSidebarComponent implements OnInit {
  @ViewChild("overlaySubMenu") overlaySubMenu: ElementRef;
  @ViewChild("subMenu") subMenu: ElementRef;
  @ViewChild("replenish") replenish: ElementRef;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter();
  @Input() accounts = [];
  isSidebarToggled: boolean;
  public userInfo: LoginModel;
  status = false;
  navRoutes: navRoute[];

  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  button: any;
  prevButtonTrigger;
  public skuErrorCount: number;
  public showLoginError: boolean;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.authService.userInfo$.pipe(filter(e => e?true:false)).subscribe((res) => {
      this.userInfo = res;
      this.getSignUpHour();
      this.navRoutes = navRoutes.filter((route) => {
        return route.permissions ? this.userInfo[route.permissions] : true;
      });
    });
    this.inventoryService.GetSkuErrors().subscribe((res) => {
      if (res) {
        this.skuErrorCount = Object.keys(res).length;
      }
    });
  }

  public getSignUpHour() {
    if (this.userInfo) {
      const d = this.userInfo.created;
      const ONE_HOUR = (60 * 60 * 1000) / 2;
      const myDate = new Date(d) as any;
      const now = new Date() as any;
      this.showLoginError = now - myDate < ONE_HOUR;
    }
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  public openBroadcastPopup(
    component: any,
    height: any,
    width: number,
    maxHeight: string,
    customClass: string
  ) {
    this.dialog.open(component, {
      width: `${width}px`,
      height: height === "auto" ? "auto" : `${height}px`,
      maxHeight,
      maxWidth: "92vw",
      panelClass: customClass !== undefined ? customClass : "",
      disableClose: true,
    });
  }

  toggleMenu() {
    this.isSidebarToggled = !this.isSidebarToggled;
    this.toggleSidebar.emit(this.isSidebarToggled);
  }

  buttonEnter(trigger) {
    setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger != trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        trigger.openMenu();
      } else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
      } else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });
  }

  public buttonLeave(trigger, button) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
      }
      if (!this.isMatMenuOpen) {
        trigger.closeMenu();
      } else {
        this.enteredButton = false;
      }
    }, 100);
  }

  openSidebar() {
    if (this.isSidebarToggled) {
      this.toggleMenu();
    }
  }
}
