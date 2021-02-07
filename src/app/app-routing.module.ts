import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./core/auth.guard";

const routes: Routes = [
  {
    path: "account",
    loadChildren: () =>
      import("./modules/authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
    data: { title: "Account" },
  },
  {
    path: "onboarding",
    loadChildren: () =>
      import("./modules/onboarding/onboarding.module").then(
        (m) => m.OnboardingModule
      ),
    canActivate: [AuthGuard],
    data: { title: "Onboarding" },
  },
  {
    path: "shipyard",
    loadChildren: () =>
      import("./modules/shipyard/shipyard.module").then(
        (m) => m.ShipyardModule
      ),
    canActivate: [AuthGuard],
    data: { title: "Shipyard" },
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./modules/settings/settings.module").then(
        (m) => m.SettingsModule
      ),
    canActivate: [AuthGuard],
    data: { title: "Settings" },
  },
  { path: "", redirectTo: "/account/login", pathMatch: "full" },
  { path: "**", redirectTo: "/account/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
