import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { ChangePasswordModel } from "src/app/models/login.model";
import { takeUntil } from "rxjs/operators";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-change-password-popup",
  templateUrl: "./change-password-popup.component.html",
  styleUrls: ["./change-password-popup.component.scss"],
})
export class ChangePasswordPopupComponent implements OnInit, OnDestroy {
  public changePasswordForm: FormGroup;
  public errorMessage: string;
  private destroy$ = new Subject<void>();
  passwordMatchingError: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordPopupComponent>
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.fb.group(
      {
        password: [null, Validators.required],
        oldPassword: [null, Validators.required],
        confirmPassword: [null, Validators.required],
      },
      {
        validator: this.checkIfMatchingPasswords("password", "confirmPassword"),
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public changePassword() {
    const data = this.changePasswordForm.value as ChangePasswordModel;
    data.userId = this.authService.getUserInfo().userId;
    this.authService
      .changePassword(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.dialogRef.close();
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
  }

  private checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  checkPasswords() {
    this.passwordMatchingError = false;
    if (
      this.changePasswordForm.controls["password"].dirty &&
      this.changePasswordForm.controls["confirmPassword"].dirty &&
      this.changePasswordForm.controls["password"].value &&
      this.changePasswordForm.controls["confirmPassword"].value &&
      this.changePasswordForm.controls["password"].value !=
        this.changePasswordForm.controls["confirmPassword"].value
    ) {
      this.passwordMatchingError = true;
    }
  }
}
