import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsBillingComponent } from "./settings-billing/settings-billing.component";
import { SettingsHomeComponent } from "./settings-home/settings-home.component";
import { SettingsIntegrationsComponent } from "./settings-integrations/settings-integrations.component";
import { SystemSettingsComponent } from "./system-settings/system-settings.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "account",
        component: SettingsHomeComponent,
        data: { title: "Account Settings" },
      },
      {
        path: "integrations",
        component: SettingsIntegrationsComponent,
        data: { title: "Integrations" },
      },
      {
        path: "billing",
        component: SettingsBillingComponent,
        data: { title: "Billing" },
      },
      {
        path: "system-settings",
        component: SystemSettingsComponent,
        data: { title: "System Settings" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
