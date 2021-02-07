import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageKeyEnum } from 'src/app/core/StorageKeyEnum';

@Component({
  selector: 'app-advisor-login',
  templateUrl: './advisor-login.component.html',
  styleUrls: ['./advisor-login.component.scss']
})
export class AdvisorLoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public errorMessage: string;
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public login() {
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: LoginModel) => {
        localStorage.setItem(StorageKeyEnum.User, JSON.stringify(value));
        this.router.navigate(['home']);
      }, (err) => {
        this.errorMessage = err.error.message;
      });
  }

}
