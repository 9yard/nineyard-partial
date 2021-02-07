import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OnboardingComponent } from "./onboarding.component";

import { BillingComponent } from "./billing/billing.component";
import { LegalComponent } from "./legal/legal.component";
import { LoadingComponent } from "./loading/loading.component";
import { MarketplacesComponent } from "./marketplaces/marketplaces.component";
import { OtherSettingsComponent } from "./other-settings/other-settings.component";
import { ProductsComponent } from "./products/products.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
  {
    path: "",
    component: OnboardingComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "welcome",
      },
      {
        path: "welcome",
        component: WelcomeComponent,
        data: { title: "Welcome" },
      },
      {
        path: "terms",
        component: LegalComponent,
        data: { title: "Terms", breadcrumb: "test" },
      },
      {
        path: "products",
        component: ProductsComponent,
        data: { title: "Build your yard" },
      },
      {
        path: "billing",
        component: BillingComponent,
        data: { title: "Billing" },
      },
      {
        path: "connect-marketplaces",
        component: MarketplacesComponent,
        data: { title: "Connect Marketplaces" },
      },
      {
        path: "other-settings",
        component: OtherSettingsComponent,
        data: { title: "Settings" },
      },
      {
        path: "loading",
        component: LoadingComponent,
        data: { title: "Finishing up" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
