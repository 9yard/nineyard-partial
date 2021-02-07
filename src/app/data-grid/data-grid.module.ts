import { ComponentsModule } from "src/app/components/components.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GridWrapperComponent } from "./grid-wrapper/grid-wrapper.component";
import { AgGridModule } from "@ag-grid-community/angular";

import { PhotoCellRendererComponent } from "src/app/components/ag-grid-components/photo-cell-renderer/photo-cell-renderer.component";
import { PriceOverrideCellRendererComponent } from "src/app/components/ag-grid-components/price-override-cell-renderer/price-override-cell-renderer.component";
import { PriceOverrideCellEditorComponent } from "src/app/components/ag-grid-components/price-override-cell-editor/price-override-cell-editor.component";
import { RepricingModelCellRendererComponent } from "src/app/components/ag-grid-components/repricing-model-cell-renderer/repricing-model-cell-renderer.component";
import { RepricingModelCellEditorComponent } from "src/app/components/ag-grid-components/repricing-model-cell-editor/repricing-model-cell-editor.component";
import { LoadingCellRendererComponent } from "src/app/components/ag-grid-components/loading-cell-renderer/loading-cell-renderer.component";
import { BooleanCellRendererComponent } from "../components/ag-grid-components/boolean-cell-renderer/boolean-cell-renderer.component";
import { BuyBoxCellRendererComponent } from "../components/ag-grid-components/buy-box-cell-renderer/buy-box-cell-renderer.component";
import { NoteCellRendererComponent } from "../components/ag-grid-components/note-cell-renderer/note-cell-renderer.component";
import { RankCellRendererComponent } from "../components/ag-grid-components/rank-cell-renderer/rank-cell-renderer.component";
import { DateCellRendererComponent } from "../components/ag-grid-components/date-cell-renderer/date-cell-renderer.component";
import { SkuCellRendererComponent } from "../components/ag-grid-components/sku-cell-renderer/sku-cell-renderer.component";
import { OffersCellRendererComponent } from "../components/ag-grid-components/offers-cell-renderer/offers-cell-renderer.component";
import { AmountInShipmentCellRendererComponent } from "../components/ag-grid-components/amount-in-shipment-cell-renderer/amount-in-shipment-cell-renderer.component";

@NgModule({
  declarations: [GridWrapperComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    AgGridModule.withComponents([
      PhotoCellRendererComponent,
      BooleanCellRendererComponent,
      BuyBoxCellRendererComponent,
      NoteCellRendererComponent,
      RankCellRendererComponent,
      SkuCellRendererComponent,
      DateCellRendererComponent,
      PriceOverrideCellRendererComponent,
      PriceOverrideCellEditorComponent,
      RepricingModelCellRendererComponent,
      RepricingModelCellEditorComponent,
      LoadingCellRendererComponent,
      OffersCellRendererComponent,
      AmountInShipmentCellRendererComponent,
    ]),
  ],
  exports: [GridWrapperComponent],
})
export class DataGridModule {}
