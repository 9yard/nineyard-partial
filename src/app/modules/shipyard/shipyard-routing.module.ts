import { SkuListComponent } from "./sku-list/sku-list.component";
import { ShipmentsDetailComponent } from "./shipments-detail/shipments-detail.component";
import { ShipmentsListComponent } from "./shipments-list/shipments-list.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "sku-list",
        component: SkuListComponent,
        data: { title: "SKU List" },
      },
      {
        path: "shipments",
        component: ShipmentsListComponent,
        data: { title: "Shipments", breadcrumb: "test" },
      },
      {
        path: "shipments/:id",
        component: ShipmentsDetailComponent,
        data: { title: "Shipment" },
      },
      {
        path: "",
        redirectTo: "sku-list",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipyardRoutingModule {}
