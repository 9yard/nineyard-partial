import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "src/app/core/auth.guard";

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

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", pathMatch:'full', redirectTo:"login" },
      {
        path: "login/:admincode",
        component: LoginComponent,
        data: { title: "Login" },
      },
      { path: "login", component: LoginComponent, data: { title: "Login" } },
      {
        path: "termsandconditions",
        component: TermsAndConditionsComponent,
        data: { title: "Term And Condition" },
      },
      {
        path: "privacy-policy",
        component: PrivacyPolicyComponent,
        data: { title: "Privacy Policy" },
      },
      {
        path: "help-page",
        component: HelpPageComponent,
        data: { title: "Help Page" },
      },
      {
        path: "adviser-login",
        component: AdvisorLoginComponent,
        data: { title: "Adviser Login" },
      },
      {
        path: "adviser-signup",
        component: AdvisorSignupComponent,
        data: { title: "Adviser Signup" },
      },
      {
        path: "reset-password",
        component: ResetPasswordComponent,
        data: { title: "Reset Password" },
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        data: { title: "Forgot Password" },
      },
      {
        path: "change-password",
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
        data: { title: "Change Password" },
      },
      {
        path: "invite-team-members",
        component: InviteTeamMembersComponent,
        canActivate: [AuthGuard],
        data: { title: "Invite Team Members" },
      },
      {
        path: "two-factor-verification",
        component: TwoFactorVerificationComponent,
        data: { title: "Two Factor Verification" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
