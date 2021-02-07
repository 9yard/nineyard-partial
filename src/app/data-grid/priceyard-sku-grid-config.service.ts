import { Injectable } from "@angular/core";

import { PriceyardService } from "../modules/priceyard/services/priceyard.service";

import { GridActionsService } from "./grid-actions.service";
import { SkuGridBaseConfigService } from "./sku-grid-base-config.service";

@Injectable({
  providedIn: "root",
})
export class PriceyardSkuGridConfigService {
  columnDefs;
  repriceModels$ = this.priceyardService.GetPriceModel();

  constructor(
    private skuGridBaseConfigService: SkuGridBaseConfigService,
    private gridActionsService: GridActionsService,
    private priceyardService: PriceyardService
  ) {
    this.columnDefs = [...this.skuGridBaseConfigService.columnDefs];

    this.columnDefs.splice(
      7,
      0,
      {
        field: "FulfillmentType",
        headerName: "Fulfillment",
        width: 100,
        sortable: true,
      },
      {
        field: "Offers",
        width: 100,
        sortable: true,
        cellRenderer: "offersCellRendererComponent",
        suppressMenu: true,
        // filter: "agMultiColumnFilter",
        // filterParams: {
        //   filters: [
        //     {
        //       filter: "agNumberColumnFilter",
        //       display: "accordion",
        //       title: "FBA Offers",
        //       filterParams: {
        //         filterOptions: ['equals', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'inRange'],
        //         defaultOption: "inRange",
        //       },
        //     },
        //     {
        //       filter: "agNumberColumnFilter",
        //       display: "accordion",
        //       title: "FBM Offers",
        //       filterParams: {
        //         filterOptions: ['equals', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'inRange'],
        //         defaultOption: "inRange",
        //       },
        //     }
        //   ],
        // },
      },
      {
        field: "Maxpr",
        headerName: "Max Price",
        width: 130,
        sortable: true,
        editable: true,
        valueParser: (params) => +params.newValue,
        cellRenderer: "priceOverrideCellRendererComponent",
        cellEditor: "priceOverrideCellEditorComponent",
        onCellValueChanged: (event) =>
          this.gridActionsService.saveMaxPrice(event),
        // filter: "agMultiColumnFilter",
        filter: "agNumberColumnFilter",
        filterParams: {
          defaultOption: "inRange",
          suppressAndOrCondition: true,
          // filters: [
          //   {
          //     filter: "agNumberColumnFilter",
          //     display: "accordion",
          //     title: "Max Price",
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
        field: "Bbupdated",
        headerName: "Offers last updated",
        sortable: true,
        width: 150,
        cellRenderer: "dateCellRendererComponent",
        filter: false,
        // filter: "agDateColumnFilter",
      }, // {
      //   headerName: "Cost",
      //   field: "Costpr",
      //   width: 90,
      //   sortable: true,
      //   valueFormatter: (param) =>
      //     param.value ? "$" + param.value.toFixed(2) : "",
      //   filter: "agNumberColumnFilter",
      //   filterParams: {
      //     defaultOption: "inRange",
      //   },
      // },

      // {
      //   field: "Prcfreeze",
      //   headerName: "Price",
      //   sortable: true,
      //   cellRenderer: "dateCellRendererComponent",
      // },

      {
        field: "Prmodel",
        headerName: "Repricing Model",
        cellRenderer: "repricingModelCellRendererComponent",
        cellEditor: "repricingModelCellEditorComponent",
        cellEditorParams: [this.repriceModels$],
        editable: true,
        sortable: true,
        width: 220,
        minWidth: 175,
        onCellValueChanged: (event) =>
          this.gridActionsService.updateSkuPricingModel(event),
        // filter: "agMultiColumnFilter",
        filter: false,
        suppressMenu: true,
        filterParams: {
          filters: [
            {
              filter: "agSetColumnFilter",
              display: "accordion",
              title: "Repricing Model",
              filterParams: {
                values: (params) => {
                  this.repriceModels$.subscribe((e) => {
                    params.success(e);
                  });
                },
              },
            },
            {
              filter: "agSetColumnFilter",
              display: "accordion",
              title: "Is Paused",
              filterParams: {
                values: ["Is Paused", "Is Active"],
              },
            },
          ],
        },
      }
    );
  }
}
