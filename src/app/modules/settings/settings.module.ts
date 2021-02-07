import { NgModule } from "@angular/core";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

import { OverlayscrollbarsModule } from "overlayscrollbars-ngx";

import { ComponentsModule } from "src/app/components/components.module";

import { SettingsRoutingModule } from "./settings-routing.module";

import { EditRoleComponent } from "./edit-role/edit-role.component";
import { EditWarehouseComponent } from "./edit-warehouse/edit-warehouse.component";
import { SettingsBillingComponent } from "./settings-billing/settings-billing.component";
import { SettingsHistoryComponent } from "./settings-history/settings-history.component";
import { SettingsHomeComponent } from "./settings-home/settings-home.component";
import { SettingsIntegrationsComponent } from "./settings-integrations/settings-integrations.component";
import { SettingsComponent } from "./settings/settings.component";
import { SystemSettingsComponent } from "./system-settings/system-settings.component";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsHomeComponent,
    SettingsIntegrationsComponent,
    SettingsBillingComponent,
    SettingsHistoryComponent,
    EditWarehouseComponent,
    EditRoleComponent,
    SystemSettingsComponent,
  ],
  imports: [
    SettingsRoutingModule,
    PerfectScrollbarModule,
    OverlayscrollbarsModule,
    ComponentsModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class SettingsModule {}
