import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { AngularMaterialModule } from "./../modules/angular-material/angular-material.module";

import { ButtonComponent } from "./button/button.component";
import { ChannalIconComponent } from "./channal-icon/channal-icon.component";
import { CommonSidebarComponent } from './common-sidebar/common-sidebar.component';
import { DragIndicatorComponent } from "./drag-indicator/drag-indicator.component";
import { FeatureExplenationComponent } from "./feature-explenation/feature-explenation.component";
import { FilterDropdownComponent } from "./filter-dropdown/filter-dropdown.component";
import { HeaderComponent } from "./header/header.component";
import { LogoComponent } from './logo/logo.component';
import { MarketplaceConnectionsComponent } from "./marketplace-connections/marketplace-connections.component";
import { NoResultsComponent } from "./no-results/no-results.component";
import { PageContainerComponent } from "./page-container/page-container.component";
import { ToasterComponent } from "./toaster/toaster.component";
import { AmountInShipmentCellRendererComponent } from "./ag-grid-components/amount-in-shipment-cell-renderer/amount-in-shipment-cell-renderer.component";
import { BooleanCellRendererComponent } from "./ag-grid-components/boolean-cell-renderer/boolean-cell-renderer.component";
import { BuyBoxCellRendererComponent } from "./ag-grid-components/buy-box-cell-renderer/buy-box-cell-renderer.component";
import { DateCellRendererComponent } from "./ag-grid-components/date-cell-renderer/date-cell-renderer.component";
import { LoadingCellRendererComponent } from "./ag-grid-components/loading-cell-renderer/loading-cell-renderer.component";
import { NoteCellRendererComponent } from "./ag-grid-components/note-cell-renderer/note-cell-renderer.component";
import { OffersCellRendererComponent } from "./ag-grid-components/offers-cell-renderer/offers-cell-renderer.component";
import { PhotoCellRendererComponent } from "./ag-grid-components/photo-cell-renderer/photo-cell-renderer.component";
import { PriceOverrideCellEditorComponent } from "./ag-grid-components/price-override-cell-editor/price-override-cell-editor.component";
import { PriceOverrideCellRendererComponent } from "./ag-grid-components/price-override-cell-renderer/price-override-cell-renderer.component";
import { RankCellRendererComponent } from "./ag-grid-components/rank-cell-renderer/rank-cell-renderer.component";
import { RepricingModelCellEditorComponent } from "./ag-grid-components/repricing-model-cell-editor/repricing-model-cell-editor.component";
import { RepricingModelCellRendererComponent } from "./ag-grid-components/repricing-model-cell-renderer/repricing-model-cell-renderer.component";
import { SkuCellRendererComponent } from "./ag-grid-components/sku-cell-renderer/sku-cell-renderer.component";
import { ConfirmDialogComponent } from "./dialogs/confirm-dialog/confirm-dialog.component";
import { DialogFooterComponent } from "./dialogs/dialog-footer/dialog-footer.component";
import { DialogHeaderComponent } from "./dialogs/dialog-header/dialog-header.component";
import { DialogComponent } from "./dialogs/dialog/dialog.component";
import { ErrorDialogComponent } from "./dialogs/error-dialog/error-dialog.component";
import { ProcessesDialogComponent } from "./header/processes-dialog/processes-dialog.component";
import { UpdatesDialogComponent } from "./header/updates-dialog/updates-dialog.component";
import { InputSwitcherComponent } from "./inputs/input-switcher/input-switcher.component";
import { RepriceModelInputComponent } from "./inputs/reprice-model-input/reprice-model-input.component";
import { AmazonNewConnectionComponent } from "./marketplace-connections/amazon-new-connection/amazon-new-connection.component";
import { WalmartNewConnectionComponent } from "./marketplace-connections/walmart-new-connection/walmart-new-connection.component";
import { PageContainerButtonGroupComponent } from "./page-container/page-container-button-group/page-container-button-group.component";
import { PageContainerDeviderComponent } from "./page-container/page-container-devider/page-container-devider.component";
import { PageContainerGroupComponent } from "./page-container/page-container-group/page-container-group.component";

@NgModule({
  declarations: [
    PageContainerComponent,
    PageContainerDeviderComponent,
    PageContainerGroupComponent,
    ButtonComponent,
    RepriceModelInputComponent,
    InputSwitcherComponent,
    ToasterComponent,
    DialogComponent,
    ErrorDialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    PhotoCellRendererComponent,
    BuyBoxCellRendererComponent,
    BooleanCellRendererComponent,
    NoteCellRendererComponent,
    RankCellRendererComponent,
    SkuCellRendererComponent,
    DateCellRendererComponent,
    PriceOverrideCellRendererComponent,
    PriceOverrideCellEditorComponent,
    RepricingModelCellRendererComponent,
    RepricingModelCellEditorComponent,
    LoadingCellRendererComponent,
    HeaderComponent,
    PageContainerButtonGroupComponent,
    OffersCellRendererComponent,
    UpdatesDialogComponent,
    ChannalIconComponent,
    FeatureExplenationComponent,
    MarketplaceConnectionsComponent,
    WalmartNewConnectionComponent,
    AmazonNewConnectionComponent,
    DragIndicatorComponent,
    AmountInShipmentCellRendererComponent,
    ConfirmDialogComponent,
    NoResultsComponent,
    ProcessesDialogComponent,
    FilterDropdownComponent,
    CommonSidebarComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule 
  ],
  exports: [
    PageContainerComponent,
    PageContainerDeviderComponent,
    PageContainerGroupComponent,
    ButtonComponent,
    RepriceModelInputComponent,
    ToasterComponent,
    DialogComponent,
    ErrorDialogComponent,
    HeaderComponent,
    PageContainerButtonGroupComponent,
    ChannalIconComponent,
    FeatureExplenationComponent,
    MarketplaceConnectionsComponent,
    WalmartNewConnectionComponent,
    AmazonNewConnectionComponent,
    DragIndicatorComponent,
    NoResultsComponent,
    CommonSidebarComponent
  ],
})
export class ComponentsModule {}
