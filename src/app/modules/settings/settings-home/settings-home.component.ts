import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

import { Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";

import { LoginModel } from "src/app/models/login.model";

import { ChangePasswordPopupComponent } from "../change-password-popup/change-password-popup.component";
import { EditRoleComponent } from "../edit-role/edit-role.component";
import { EditWarehouseComponent } from "../edit-warehouse/edit-warehouse.component";
import { SettingsHistoryComponent } from "../settings-history/settings-history.component";
import { AuthService } from "../../../services/auth.service";
import { SettingsService } from "../../../services/settings.service";

@Component({
  selector: "app-settings-home",
  templateUrl: "./settings-home.component.html",
  styleUrls: ["./settings-home.component.scss"],
})
export class SettingsHomeComponent implements OnInit, OnDestroy {
  @Input() users: any;
  @Output() refreshUser: EventEmitter<any> = new EventEmitter();
  @ViewChild("imageWithSkuInfo") imageWithSkuInfo: ElementRef;
  @ViewChild("overlayCustomTooltip") overlayCustomTooltip: ElementRef;
  public userEditable = false;
  public warehouses: any = [];
  public profileForm: FormGroup = this.fb.group({
    username: ["", Validators.required],
    email: ["", Validators.required],
    company: ["", Validators.required],
    role: [""],
  });
  public showSubmitBtn = false;
  public allRoles: any;
  private destroy$ = new Subject<void>();
  private cancelEmailVerification = new Subject();
  public emailError: string = "";
  public emailVerified: boolean = true;
  public role: string;

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private authService: AuthService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.authService.userInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((usr: LoginModel) => {
        const { username, email, company, role } = usr;
        this.role = role;
        this.profileForm.patchValue({ username, email, company, role });
      });
    this.getWarehouse();
    this.authService
      .getAllRoles()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.allRoles = res;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public onToggleWhsIsFba(id: string, enabled: boolean) {

  }

  public openSettingsHistory() {
    this.openBroadcastPopup(
      SettingsHistoryComponent,
      "auto",
      665,
      "90%",
      "settings_history"
    );
  }

  public openEditWarehouse(type, data?: any) {
    this.openBroadcastPopup(
      EditWarehouseComponent,
      "auto",
      493,
      "90%",
      "edit_warehouse",
      { ...{ type }, ...data }
    );
  }

  public openBroadcastPopup(
    component: any,
    height: any,
    width: number,
    maxHeight: string,
    customClass: string,
    data: any = {}
  ) {
    const dialogRef = this.dialog.open(component, {
      width: `${width}px`,
      height: height === "auto" ? "auto" : `${height}px`,
      maxHeight,
      maxWidth: "92vw",
      panelClass: customClass !== undefined ? customClass : "",
      data,
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.getWarehouse();
        }
      });
  }

  public customTooltip($e) {
    this.imageWithSkuInfo.nativeElement.style.cssText = `display: block; top: ${
      $e.pageY - 15
    }px; left: ${$e.pageX - 15}px`;
    this.overlayCustomTooltip.nativeElement.style.cssText = `display: block`;
  }

  public closeCustomTooltip() {
    this.overlayCustomTooltip.nativeElement.style.cssText = this.imageWithSkuInfo.nativeElement.style.cssText = `display: none;`;
  }

  public deleteWareHouse(id) {
   
  }

  public getWarehouse() {
    this.settingsService
      .GetAllWarehouses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.warehouses = res;
      });
  }

  public deleteUser(id) {
    
  }

  public editableOn(user) {
   
  }

  public submitProfileForm() {
   
  }

  public updateUser(data) {
    this.authService
      .updateUser(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        
      });
  }

  public openChangePasswordPopup() {
    this.dialog.open(ChangePasswordPopupComponent, {
      width: `500px`,
      height: "auto",
      maxHeight: "900px",
      maxWidth: "92vw",
      disableClose: true,
    });
  }
  verifyEmail = () => {
    this.emailVerified = false;
    if (!this.profileForm.controls["email"].valid) return;
    this.cancelEmailVerification.next();
    this.authService
      .verifyEmail(this.profileForm.controls["email"].value)
      .pipe(takeUntil(this.cancelEmailVerification))
      .subscribe(
        (response) => {
          this.emailError = "";
          this.emailVerified = true;
        },
        (error) => {
          this.emailError = error.error.message;
        }
      );
  };
}
