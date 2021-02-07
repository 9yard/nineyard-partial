import { Injectable } from "@angular/core";

import {
  GridApi,
  GridOptions,
  ServerSideStoreType,
} from "@ag-grid-community/core";

import { SkuCellRendererComponent } from "src/app/components/ag-grid-components/sku-cell-renderer/sku-cell-renderer.component";
import { DateCellRendererComponent } from "src/app/components/ag-grid-components/date-cell-renderer/date-cell-renderer.component";
import { PriceOverrideCellRendererComponent } from "src/app/components/ag-grid-components/price-override-cell-renderer/price-override-cell-renderer.component";
import { PriceOverrideCellEditorComponent } from "src/app/components/ag-grid-components/price-override-cell-editor/price-override-cell-editor.component";
import { RepricingModelCellRendererComponent } from "src/app/components/ag-grid-components/repricing-model-cell-renderer/repricing-model-cell-renderer.component";
import { RepricingModelCellEditorComponent } from "src/app/components/ag-grid-components/repricing-model-cell-editor/repricing-model-cell-editor.component";
import { LoadingCellRendererComponent } from "src/app/components/ag-grid-components/loading-cell-renderer/loading-cell-renderer.component";
import { OffersCellRendererComponent } from "src/app/components/ag-grid-components/offers-cell-renderer/offers-cell-renderer.component";
import { HeaderService } from "src/app/components/header/header.service";

import { ReplaySubject } from "rxjs";

import { AmountInShipmentCellRendererComponent } from "./../components/ag-grid-components/amount-in-shipment-cell-renderer/amount-in-shipment-cell-renderer.component";
import { BooleanCellRendererComponent } from "../components/ag-grid-components/boolean-cell-renderer/boolean-cell-renderer.component";
import { BuyBoxCellRendererComponent } from "../components/ag-grid-components/buy-box-cell-renderer/buy-box-cell-renderer.component";
import { NoteCellRendererComponent } from "../components/ag-grid-components/note-cell-renderer/note-cell-renderer.component";
import { PhotoCellRendererComponent } from "../components/ag-grid-components/photo-cell-renderer/photo-cell-renderer.component";
import { RankCellRendererComponent } from "../components/ag-grid-components/rank-cell-renderer/rank-cell-renderer.component";

import { GridActionsService } from "./grid-actions.service";
import { GridApiService } from "./grid-api.service";

@Injectable({
  providedIn: "root",
})
export class SkuGridBaseConfigService {
  gridApi: GridApi;
  accountFilterList$: ReplaySubject<[string]> = new ReplaySubject();
  accounts;

  constructor(
    private gridActionsService: GridActionsService,
    public headerService: HeaderService,
    private gridApiService: GridApiService
  ) {
    this.gridApiService.gridApi$.subscribe((e: GridOptions) => {
      this.gridApi = e.api;
      this.gridApi.closeToolPanel();
    });
    this.headerService.accountsSelected.subscribe((e) => {
      this.accounts = e;
      if (this.gridApi) {
        this.gridApi.refreshServerSideStore({ route: [], purge: true });
      }
    });
  }

  columnDefs = [
    {
      field: "",
      checkboxSelection: true,
      width: 50,
      resizable: false,
      pinned: true,
    },
    {
      field: "Active",
      filter: "agSetColumnFilter",
      hide: true,
      filterParams: {
        values: [true, false],
      },
    },
    {
      field: "Image",
      width: 110,
      cellRenderer: "photoCellRendererComponent",
      suppressMenu: true,
      pinned: true,
    },
    {
      field: "Sku",
      sortable: true,
      minWidth: 180,
      cellRenderer: "skuCellRendererComponent",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: "agTextColumnFilter",
            display: "accordion",
            title: "SKU",
            filterParams: {
              defaultOption: "startsWith",
              suppressAndOrCondition: true,
            },
          },
          {
            filter: "agTextColumnFilter",
            display: "accordion",
            title: "ASIN",
            filterParams: {
              defaultOption: "startsWith",
              suppressAndOrCondition: true,
            },
          },
        ],
      },

      pinned: true,
    },
    {
      field: "Title",
      width: 180,
      filter: "agTextColumnFilter",
      tooltipValueGetter: (params) => params.value,
      sortable: true,
    },
    {
      field: "Buybox",
      headerName: "BuyBox",
      width: 120,
      sortable: true,
      cellRenderer: "buyBoxCellRendererComponent",

      filter: "agNumberColumnFilter",
      filterParams: {
        defaultOption: "inRange",
        suppressAndOrCondition: true,
        // filters: [
        //   {
        //     filter: "agNumberColumnFilter",
        //     display: "accordion",
        //     title: "Price",
        //     filterParams: {
        //       defaultOption: "inRange",
        //       suppressAndOrCondition: true,
        //     },
        //   },
        //   {
        //     filter: "agSetColumnFilter",
        //     display: "accordion",
        //     title: "Buybox Winner",
        //     filterParams: {
        //       values: ["Amazon", "Fba", "Fbm", "Me", "No Buybox"],
        //     },
        //   },
        // ],
      },
    },
    {
      field: "Minpr",
      headerName: "Min Price",
      width: 130,
      sortable: true,
      editable: true,
      cellRenderer: "priceOverrideCellRendererComponent",
      cellEditor: "priceOverrideCellEditorComponent",
      onCellValueChanged: (event) =>
        this.gridActionsService.saveMinPrice(event),
      // filter: "agMultiColumnFilter",
      filter: "agNumberColumnFilter",
      filterParams: {
        defaultOption: "inRange",
        suppressAndOrCondition: true,
        // filters: [
        //   {
        //     filter: "agNumberColumnFilter",
        //     display: "accordion",
        //     title: "Min Price",
        //     filterParams: {
        //       defaultOption: "inRange",
        //       suppressAndOrCondition: true,
        //     },
        //   },
        //   {
        //     filter: "agSetColumnFilter",
        //     display: "accordion",
        //     title: "Price type",
        //     filterParams: {
        //       values: ["Is Manual", "Is Auto"],
        //     },
        //   },
        // ],
      },
    },
    {
      field: "Qty",
      headerName: "FBA Stock",
      width: 100,
      sortable: true,
    },
    {
      field: "Price",
      width: 80,
      sortable: true,
      valueFormatter: (param) =>
        param.value ? "$" + param.value.toFixed(2) : "",
      filter: "agNumberColumnFilter",
      filterParams: {
        defaultOption: "inRange",
      },
    },

    {
      field: "Rank",
      sortable: true,
      cellRenderer: "rankCellRendererComponent",
      filter: false,
      suppressMenu: true,
    },
    {
      field: "Account",
      width: 140,
      sortable: true,
      filter: false,
    },
    {
      field: "Repriced",
      headerName: "Last Repriced",
      width: 140,
      sortable: true,
      cellRenderer: "dateCellRendererComponent",
      filter: false,
      // filter: "agDateColumnFilter",
    },

    {
      field: "Note",
      sortable: true,
      editable: true,
      cellRenderer: "noteCellRendererComponent",
      onCellValueChanged: (event) => this.gridActionsService.editNote(event),
      filter: "agTextColumnFilter",
    },
  ];

  frameworkComponents = {
    photoCellRendererComponent: PhotoCellRendererComponent,
    booleanCellRendererComponent: BooleanCellRendererComponent,
    buyBoxCellRendererComponent: BuyBoxCellRendererComponent,
    noteCellRendererComponent: NoteCellRendererComponent,
    rankCellRendererComponent: RankCellRendererComponent,
    skuCellRendererComponent: SkuCellRendererComponent,
    dateCellRendererComponent: DateCellRendererComponent,
    priceOverrideCellRendererComponent: PriceOverrideCellRendererComponent,
    priceOverrideCellEditorComponent: PriceOverrideCellEditorComponent,
    repricingModelCellRendererComponent: RepricingModelCellRendererComponent,
    repricingModelCellEditorComponent: RepricingModelCellEditorComponent,
    loadingCellRenderer: LoadingCellRendererComponent,
    offersCellRendererComponent: OffersCellRendererComponent,
    amountInShipmentCellRendererComponent: AmountInShipmentCellRendererComponent,
  };

  gridOptions: GridOptions = {
    rowModelType: "serverSide",
    serverSideStoreType: ServerSideStoreType.Partial,
    suppressCopyRowsToClipboard: true,
    defaultColDef: {
      resizable: true,
      filterParams: {
        suppressAndOrCondition: true,
      },
      menuTabs: ["filterMenuTab"],
    },
    frameworkComponents: this.frameworkComponents,
    rowHeight: 58,
    rowSelection: "multiple",
    suppressRowClickSelection: true,
    loadingCellRenderer: "loadingCellRenderer",
    sideBar: true,
    cacheBlockSize: 100,
    pivotPanelShow: "onlyWhenPivoting",
    rowBuffer: 50,
    enableCellChangeFlash: true,
    onGridReady: (e) => {
      this.gridApiService.gridApi$.next(e);
    },
    onColumnResized: () => this.gridActionsService.saveColumnState(),
    onColumnVisible: () => this.gridActionsService.saveColumnState(),
    onColumnPinned: () => this.gridActionsService.saveColumnState(),
    onColumnMoved: () => this.gridActionsService.saveColumnState(),
    onSortChanged: () => this.gridActionsService.saveColumnState(),
    // onFirstDataRendered: () => this.gridActionsService.applycolumnState(),
    onSelectionChanged: (e) => this.gridActionsService.updateSelectedRows(e),
    onFilterChanged: () => this.gridActionsService.updateSelectedFilters(),
  };
}
