import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "src/app/components/components.module";
import { PipesModule } from "src/app/pipes/pipes.module";

import { AngularMaterialModule } from "./../angular-material/angular-material.module";
import { DataGridModule } from "./../../data-grid/data-grid.module";

import { ShipyardRoutingModule } from "./shipyard-routing.module";

import { ShipmentsDetailComponent } from "./shipments-detail/shipments-detail.component";
import { ShipmentsListComponent } from "./shipments-list/shipments-list.component";
import { SkuListComponent } from "./sku-list/sku-list.component";
import { ShipmentBoxListComponent } from "./shipments-detail/shipment-box-list/shipment-box-list.component";
import { ShipmentBoxComponent } from "./shipments-detail/shipment-box/shipment-box.component";
import { ShipmentSkuListComponent } from "./shipments-detail/shipment-sku-list/shipment-sku-list.component";
import { ShipmentSkuComponent } from "./shipments-detail/shipment-sku/shipment-sku.component";
import { ShipmentsListItemComponent } from "./shipments-list/shipments-list-item/shipments-list-item.component";
import { PlanShipmentDialogComponent } from "./shipments-list/plan-shipment-dialog/plan-shipment-dialog.component";
import { AddSkuToShipmentComponent } from "./shipments-list/add-sku-to-shipment/add-sku-to-shipment.component";
import { UpdateSkuQtyComponent } from "./shipments-detail/update-sku-qty/update-sku-qty.component";
import { PrintLablesDialogComponent } from "./shipments-detail/print-lables-dialog/print-lables-dialog.component";
import { AddSkuToCurrentShipmentComponent } from "./shipments-detail/add-sku-to-current-shipment/add-sku-to-current-shipment.component";
import { ShipmentPlanItemComponent } from "./shipment-plan-item/shipment-plan-item.component";
import { ItemOverflowDialogComponent } from "./shipments-detail/item-overflow-dialog/item-overflow-dialog.component";
import { CreateMultipleBoxesDialogComponent } from "./shipments-detail/create-multiple-boxes-dialog/create-multiple-boxes-dialog.component";
@NgModule({
  declarations: [
    SkuListComponent,
    ShipmentsListComponent,
    ShipmentsDetailComponent,
    ShipmentSkuListComponent,
    ShipmentBoxListComponent,
    ShipmentBoxComponent,
    ShipmentSkuComponent,
    ShipmentsListItemComponent,
    PlanShipmentDialogComponent,
    AddSkuToShipmentComponent,
    UpdateSkuQtyComponent,
    PrintLablesDialogComponent,
    AddSkuToCurrentShipmentComponent,
    ShipmentPlanItemComponent,
    ItemOverflowDialogComponent,
    CreateMultipleBoxesDialogComponent,
  ],
  imports: [
    CommonModule,
    ShipyardRoutingModule,
    DataGridModule,
    ComponentsModule,
    AngularMaterialModule,
    PipesModule,
    ReactiveFormsModule,
  ],
})
export class ShipyardModule {}
