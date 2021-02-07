import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

import { PdfViewerModule } from "ng2-pdf-viewer";

import { OverlayscrollbarsModule } from "overlayscrollbars-ngx";

import { AuthenticationRoutingModule } from "./authentication-routing.module";

import { AdvisorLoginComponent } from "./advisor-login/advisor-login.component";
import { AdvisorSignupComponent } from "./advisor-signup/advisor-signup.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { HelpPageComponent } from "./help-page/help-page.component";
import { InviteTeamMembersComponent } from "./invite-team-members/invite-team-members.component";
import { LoginComponent } from "./login/login.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { TermsAndConditionsComponent } from "./terms-and-conditions/terms-and-conditions.component";
import { TwoFactorVerificationComponent } from "./two-factor-verification/two-factor-verification.component";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    InviteTeamMembersComponent,
    TwoFactorVerificationComponent,
    AdvisorLoginComponent,
    AdvisorSignupComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    HelpPageComponent,
  ],
  imports: [
    PerfectScrollbarModule,
    PdfViewerModule,
    OverlayscrollbarsModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  exports: [],
})
export class AuthenticationModule {}
