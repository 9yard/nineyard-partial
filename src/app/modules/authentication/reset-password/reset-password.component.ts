import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordModel } from 'src/app/models/login.model';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public resetPasswordForm: FormGroup;
  public code: string;
  public errorMessage: string;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.code = decodeURIComponent(params.p);
    });
  }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword') });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public resetPassword() {
    const date: ResetPasswordModel = {
      code: this.code,
      password: this.resetPasswordForm.get('newPassword').value
    };

    this.authService.resetPassword(date).pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.errorMessage = null;
        this.router.navigate(['/account/login']);
      }, (err) => this.errorMessage = err.error.message);
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
