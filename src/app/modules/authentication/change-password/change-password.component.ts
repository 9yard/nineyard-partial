import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ChangePasswordModel } from 'src/app/models/login.model';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  public changePasswordForm: FormGroup;
  public errorMessage: string;
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      password: [null, Validators.required],
      oldPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public changePassword() {
    const data = this.changePasswordForm.value as ChangePasswordModel;
    data.userId = this.authService.getUserInfo().userId;
    this.authService.changePassword(data).pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/account/login']);
      }, (err) => {
        this.errorMessage = err.error.message;
      });
  }

  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
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

}
