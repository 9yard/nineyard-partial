import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { RegisterModel } from 'src/app/models/register.model';
import { LoginModel } from 'src/app/models/login.model';

import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { StorageKeyEnum } from 'src/app/core/StorageKeyEnum';
@Component({
  selector: 'app-advisor-signup',
  templateUrl: './advisor-signup.component.html',
  styleUrls: ['./advisor-signup.component.scss']
})
export class AdvisorSignupComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public usernameErrorMessage: string;
  public emailErrorMessage: string;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      Username: [null, Validators.required],
      Password: [null, Validators.required],
      ConfirmPassword: [null, Validators.required],
      Email: [null, [Validators.required, Validators.email]],
      Phone: [null, Validators.required],
      Company: [null, Validators.required],
      Website: [null]
    }, { validator: this.checkIfMatchingPasswords('Password', 'ConfirmPassword') });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public verifyUsername() {
    const username = this.registerForm.get('Username').value;
    if (username) {
      this.authService.verifyUsername(username).pipe(takeUntil(this.destroy$))
        .subscribe(() => this.usernameErrorMessage = null,
          (err) => this.usernameErrorMessage = err.error.message);

    } else {
      this.usernameErrorMessage = null;
    }
  }

  public verifyEmail() {
    const email = this.registerForm.get('Email').value;
    if (email) {
      if (this.registerForm.get('Email').valid) {
        this.authService.verifyEmail(email).pipe(takeUntil(this.destroy$))
          .subscribe(() => this.emailErrorMessage = null,
            (err) => this.emailErrorMessage = err.error.message);
      }

    } else {
      this.emailErrorMessage = null;
    }
  }

  public onSubmit() {
    const data = this.registerForm.value as RegisterModel;
    this.authService.register(data).pipe(
      switchMap(() => this.authService.login(data.username, data.password)),
      takeUntil(this.destroy$)
    ).subscribe((value: LoginModel) => {
      localStorage.setItem(StorageKeyEnum.User, JSON.stringify(value));
      this.router.navigate(['/onboarding-question/', 1]);
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
