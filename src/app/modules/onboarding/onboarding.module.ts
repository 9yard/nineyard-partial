import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AngularMaterialModule } from "./../angular-material/angular-material.module";
import { ComponentsModule } from "./../../components/components.module";

import { OnboardingRoutingModule } from "./onboarding-routing.module";
import { OnboardingComponent } from "./onboarding.component";

import { BillingComponent } from "./billing/billing.component";
import { LegalComponent } from "./legal/legal.component";
import { LoadingComponent } from "./loading/loading.component";
import { MarketplacesComponent } from "./marketplaces/marketplaces.component";
import { OtherSettingsComponent } from "./other-settings/other-settings.component";
import { ProductsComponent } from "./products/products.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ApplicationComponent } from "./products/application/application.component";
import { CreditCardDirectivesModule } from "angular-cc-library";

@NgModule({
  declarations: [
    WelcomeComponent,
    ProductsComponent,
    BillingComponent,
    MarketplacesComponent,
    OtherSettingsComponent,
    LegalComponent,
    LoadingComponent,
    OnboardingComponent,
    ApplicationComponent,
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    CreditCardDirectivesModule,
  ],
})
export class OnboardingModule {}
