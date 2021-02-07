import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ToastService } from 'src/app/core/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  public forgotPasswordForm: FormGroup;
  public errorMessage: string;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public sendEmail() {
    this.authService.forgotPassword(this.forgotPasswordForm.get('email').value).pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toastService.showToaster('Your password reset link has been sent.');
        this.router.navigate(['/account/login']);
      }, (error) => this.errorMessage = error.error.message);
  }

}
