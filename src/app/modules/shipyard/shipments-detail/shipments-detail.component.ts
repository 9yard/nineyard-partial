import { MatSnackBar } from "@angular/material/snack-bar";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { HeaderService } from "src/app/components/header/header.service";

import { saveAs } from "file-saver";

import { filter, map, startWith, switchMap, takeUntil } from "rxjs/operators";
import { Observable, merge, of, Subject } from "rxjs";

import {
  AddToExistingBox,
  ShipmentDetail,
} from "src/app/models/shipyard.model";
import { ShipmentService } from "src/app/services/shipment.service";
import { SettingsService } from "src/app/services/settings.service";

import { ShipyardService } from "../shipyard.service";
import { AddSkuToShipmentComponent } from "./../shipments-list/add-sku-to-shipment/add-sku-to-shipment.component";
import { ShipmentSku } from "./../../../models/shipyard.model";
import { ScannerService } from "./../../../services/scanner.service";
import { ConfirmDialogComponent } from "./../../../components/dialogs/confirm-dialog/confirm-dialog.component";

import { AddSkuToCurrentShipmentComponent } from "./add-sku-to-current-shipment/add-sku-to-current-shipment.component";
import { UpdateSkuQtyComponent } from "./update-sku-qty/update-sku-qty.component";
import { ItemOverflowDialogComponent } from "./item-overflow-dialog/item-overflow-dialog.component";
import { CreateMultipleBoxesDialogComponent } from "./create-multiple-boxes-dialog/create-multiple-boxes-dialog.component";

@Component({
  selector: "app-shipments-detail",
  templateUrl: "./shipments-detail.component.html",
  styleUrls: ["./shipments-detail.component.scss"],
})
export class ShipmentsDetailComponent implements OnInit, OnDestroy {
  skuListFilter$;
  _shipmentId: number;
  get shipmentId() {
    return this._shipmentId;
  }
  set shipmentId(value) {
    this._shipmentId = value;
    console.log({ value });

    this.loadShipment(true);
  }
  shipment: ShipmentDetail;
  skuSearch = new FormControl("");
  skuSort = new FormControl("default");
  name = new FormControl("all");
  boxSearch = new FormControl("");
  shipmentSkus$: Observable<any> = new Observable();
  shipmentBoxes$: Observable<any> = new Observable();
  expanded = true;
  skus = [];
  shipmentBoxes = [];
  private destroy$ = new Subject<void>();
  printer;
  _scanInto: string | number;
  loading: boolean;
  canEdit: boolean;
  shipmentErrors: any[] = [];
  get scanInto() {
    return this._scanInto;
  }

  set scanInto(newValue: string | number) {
    this._scanInto = newValue;
  }

  constructor(
    private route: ActivatedRoute,
    public shipyardService: ShipyardService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private shipmentService: ShipmentService,
    private settingsService: SettingsService,
    private scannerService: ScannerService,
    private router: Router,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.shipmentId = this.route.snapshot.params["id"];

    this.shipyardService.dropListIds.push(
      "create-drop-all",
      "create-drop-some",
      "create-multiple-boxes",
      "sku-list"
    );

    this.settingsService
      .GetSelectedPrinter()
      .pipe(takeUntil(this.destroy$))
      .subscribe((printer: any[]) => {
        this.printer = printer.find((x) => x.printerType === 1);
      });

    this.setScanner();

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e: RouterEvent) => e instanceof NavigationEnd)
      )
      .subscribe((e: any) => {
        const url = e.urlAfterRedirects.split("/");
        const id = url[url.length - 1];
        this.shipmentId = id;
      });

    this.headerService.accountsSelectDisabled.next(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.headerService.accountsSelectDisabled.next(false);
  }

  loadShipment(refresh = false) {
    this.loading = true;
    this.shipyardService.GetShipmentDetail(this.shipmentId, refresh).subscribe(
      (shipment: ShipmentDetail) => {
        this.shipment = shipment;
        this.loading = false;
        this.headerService.title.next(
          "Shipment: " +
            (this.shipment.amazonShipmentId
              ? this.shipment.amazonShipmentId
              : this.shipment.shipmentHeaderId) +
            " Status: " +
            this.shipment.status
        );
        this.canEdit = this.shipment.status === "WORKING";
        this.shipmentErrors = this.shipment.skus.map(
          (sku) => sku.shipmentErrors && sku.shipmentErrors.length
        );
        this.shipmentSkus$ = merge(
          this.name.valueChanges,
          this.skuSearch.valueChanges,
          this.skuSort.valueChanges
        ).pipe(
          startWith(""),
          switchMap(() => of(this.shipment.skus)),
          map((skus: any[]) => {
            return skus.filter((sku) => {
              if (this.name.value === "all") {
                return sku;
              } else if (this.name.value === "boxed") {
                return sku.totalBoxed;
              } else if (this.name.value === "unboxed") {
                return sku.qty > sku.totalBoxed;
              }
              return sku;
            });
          }),
          map((skus: any[]) => {
            if (!this.skuSearch.value) {
              return skus;
            } else {
              return skus.filter((sku) => {
                return (
                  sku.sku
                    .toLowerCase()
                    .includes(this.skuSearch.value.toLowerCase()) ||
                  sku.fnSku
                    .toLowerCase()
                    .includes(this.skuSearch.value.toLowerCase())
                );
              });
            }
          }),
          map((skus: any[]) => {
            if (!this.skuSort.value) {
              return skus;
            } else {
              return skus.sort((a, b) => {
                return a[this.skuSort.value] - b[this.skuSort.value];
              });
            }
          })
        );

        this.shipmentBoxes$ = this.boxSearch.valueChanges.pipe(
          startWith(""),
          switchMap(() => of(this.shipment.boxes)),
          map((boxes) => {
            return JSON.parse(JSON.stringify(boxes));
          }),
          map((boxes: any[]) => {
            return boxes.filter((box) => {
              if (!this.boxSearch.value) {
                return box;
              } else {
                box.skus = box.skus.filter(
                  (sku) =>
                    sku.sku
                      .toLowerCase()
                      .includes(this.boxSearch.value.toLowerCase()) ||
                    sku.fnSku
                      .toLowerCase()
                      .includes(this.boxSearch.value.toLowerCase())
                );
                return box.skus.length ? box : false;
              }
            });
          })
        );
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  drop(e: CdkDragDrop<any>) {
    if (e.isPointerOverContainer) {
      const sku: ShipmentSku = e.item.data;
      if (e.container.id === "create-drop-all") {
        this.addSkuToBox(sku.sku, [sku.qty - sku.totalBoxed]);
      } else if (e.container.id === "create-drop-some") {
        this.addSomeToBox(sku);
      } else if (e.container.id === "create-multiple-boxes") {
        this.addToMultipleBoxes(sku);
      } else if (e.container.data && e.container.data.boxId) {
        if (e.container.data.partial) {
          this.addSomeToBox(e.item.data, e.container.data.boxId);
        } else {
          this.addToExistingBox({
            sku: e.item.data.sku,
            qty: e.item.data.qty - e.item.data.totalBoxed,
            boxId: e.container.data.boxId,
          });
        }
      }
    }
  }

  addSomeToBox(sku: ShipmentSku, boxId: number = null) {
    const dialog = this.dialog.open(UpdateSkuQtyComponent, {
      width: "600px",
      data: {
        title: "Add sku to box",
        inputLabel: "Select Quantity to add to box",
        sku,
        maxQty: sku.qty - sku.totalBoxed,
        prefilQty: sku.qty - sku.totalBoxed,
      },
    });

    dialog
      .afterClosed()
      .pipe(filter((e) => e))
      .subscribe((e) => {
        this.addSkuToBox(sku.sku, [e], boxId);
      });
  }

  addToMultipleBoxes(sku) {
    const dialog = this.dialog.open(CreateMultipleBoxesDialogComponent, {
      width: "600px",
      data: sku,
    });

    dialog
      .afterClosed()
      .pipe(filter((e) => e))
      .subscribe((e) => {
        const amountOfBoxes = Math.floor(e.amount / e.amountPerBox);
        const amountRemiander = e.amount % e.amountPerBox;
        const array = [];
        for (let i = 0; i < amountOfBoxes; i++) {
          array.push(e.amountPerBox);
        }
        if (amountRemiander) {
          array.push(amountRemiander);
        }
        this.addSkuToBox(sku.sku, array);
      });
  }

  updateSku(sku) {
    const dialog = this.dialog.open(UpdateSkuQtyComponent, {
      width: "600px",
      data: {
        title: "Update Quantity",
        inputLabel: "New Quantity",
        sku,
        qty: sku.qty,
        minQty: sku.totalBoxed,
      },
    });
    dialog
      .afterClosed()
      .pipe(filter((e) => e))
      .subscribe((e) => {
        const data = {
          skus: [
            {
              sku: sku.sku,
              qty: e,
            },
          ],
          shipmentHeaderId: this.shipment.shipmentHeaderId,
          appendQty: false,
        };
        this.shipyardService
          .EditShipmentSku(data)
          .subscribe((e) => this.loadShipment());
      });
  }

  UpdateBoxSkuQty(sku: ShipmentSku, boxId: number) {
    const dialog = this.dialog.open(UpdateSkuQtyComponent, {
      width: "600px",
      data: {
        title: "Update Qty",
        inputLabel: "New Quantity",
        sku,
        qty: sku.qty,
      },
    });
    dialog
      .afterClosed()
      .pipe(filter((e) => e))
      .subscribe((e) => {
        this.shipyardService
          .UpdateBoxSkuQty(
            sku.sku,
            this.shipment.shipmentHeaderId,
            e,
            boxId,
            false
          )
          .subscribe((e) => this.loadShipment());
      });
  }

  removeSku(sku) {
    console.log(sku);
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: "600px",
      data: {
        title: "Remove SKU",
        message: `Are you sure you want to remove ${sku.sku} from this shipment?`,
      },
    });

    dialog
      .afterClosed()
      .pipe(filter((e) => e === "Confirm"))
      .subscribe((e) => {
        this.shipyardService
          .EditShipmentSku({
            skus: [
              {
                sku: sku.sku,
                qty: sku.qty - (sku.qty - sku.totalBoxed),
              },
            ],
            shipmentHeaderId: this.shipment.shipmentHeaderId,
            appendQty: false,
          })
          .subscribe((e) => this.loadShipment());
      });
  }

  printSkuQty(sku: ShipmentSku) {
    const dialog = this.dialog.open(UpdateSkuQtyComponent, {
      width: "600px",
      data: {
        title: "Print Labels",
        description: `SKU: ${sku.sku} ● QTY: ${sku.qty - sku.printedCount}`,
        inputLabel: "Amount of label to print",
        sku: sku,
        prefilQty:
          sku.qty - sku.printedCount > 0 ? sku.qty - sku.printedCount : sku.qty,
      },
    });

    dialog.afterClosed().subscribe((e) => {
      if (e) {
        const data = {
          skus: [
            {
              sku: sku.sku,
              qty: e,
            },
          ],
          account: this.shipment.account,
          shipmentHeaderId: this.shipment.shipmentHeaderId,
        };

        return this.shipyardService.PrintSku(data).subscribe(
          (value: any) => {
            this.printLabel(value, "SkuLabel");
            this.loadShipment();
          },
          (err) =>
            this.snackBar.open("Error printing labels", "Dismiss", {
              duration: 5000,
            })
        );
      }
    });
  }

  createBox() {
    this.shipyardService
      .CreateBox(this.shipment.shipmentHeaderId)
      .subscribe((e) => {
        this.loadShipment();
      });
  }

  addSkuToBox(
    sku,
    qty: number[],
    boxId: number = null,
    CreateIfNotExists = false
  ) {
    const boxQty = qty.map((qty) => {
      return {
        boxId: boxId,
        qty: qty,
      };
    });
    const data = {
      sku: sku,
      shipmentHeaderId: this.shipment.shipmentHeaderId,
      boxQty: boxQty,
      CreateIfNotExists,
    };

    this.shipyardService.AddSkuToBox(data).subscribe((e) => {
      this.loadShipment();
      const qtySum = qty.reduce((a, b) => a + b, 0);
      this.snackBar.open(
        ` ${qtySum} of ${data.sku} Boxed Successfully`,
        "dismiss",
        {
          duration: 4000,
        }
      );
    });
  }

  addToExistingBox(e: AddToExistingBox) {
    const data = {
      sku: e.sku,
      shipmentHeaderId: this.shipment.shipmentHeaderId,
      boxQty: [
        {
          boxId: e.boxId,
          qty: e.qty,
        },
      ],
    };
    this.shipyardService.AddSkuToBox(data).subscribe((e) => {
      this.loadShipment();
    });
  }

  highlightSku(sku) {
    if (this.boxSearch.value !== sku) {
      this.boxSearch.setValue(sku);
    } else {
      this.boxSearch.setValue("");
    }
  }

  emptyBox(event) {
    this.dialog
      .open(ConfirmDialogComponent, {
        width: "600px",
        data: {
          title: "Empty Box",
          message: "Are you sure you want to empty this box?",
        },
      })
      .afterClosed()
      .pipe(
        filter((e) => e === "Confirm"),
        switchMap(() =>
          this.shipyardService.UnpackBox(event, this.shipment.shipmentHeaderId)
        )
      )
      .subscribe(() => this.loadShipment());
  }

  unpackAllBoxes() {
    this.dialog
      .open(ConfirmDialogComponent, {
        width: "600px",
        data: {
          title: "Unpack All Boxes",
          message: "Are you sure you want to empty all boxes?",
        },
      })
      .afterClosed()
      .pipe(
        filter((e) => e === "Confirm"),
        switchMap(() =>
          this.shipyardService.UnpackAll(this.shipment.shipmentHeaderId)
        )
      )
      .subscribe(() => this.loadShipment());
  }

  removeEmptyBoxes() {
    this.dialog
      .open(ConfirmDialogComponent, {
        width: "600px",
        data: {
          title: "Remove Empty Boxes",
          message: "Are you sure you want to remove all emppty boxes?",
        },
      })
      .afterClosed()
      .pipe(
        filter((e) => e === "Confirm"),
        switchMap(() =>
          this.shipyardService.RemoveEmptyBoxes(this.shipment.shipmentHeaderId)
        )
      )
      .subscribe(() => this.loadShipment());
  }

  deleteBox(event) {
    this.dialog
      .open(ConfirmDialogComponent, {
        width: "600px",
        data: {
          title: "Delete Box",
          message: `Are you sure you want to delete this box?`,
        },
      })
      .afterClosed()
      .pipe(
        filter((e) => e === "Confirm"),
        switchMap(() =>
          this.shipyardService.DeleteBox(event, this.shipment.shipmentHeaderId)
        )
      )
      .subscribe(() => this.loadShipment());
  }

  printSkuLabel(skus: ShipmentSku[]) {
    const mappedSkus = skus.map((sku) => {
      return {
        sku: sku.sku,
        qty:
          sku.qty - sku.printedCount < 1 ? sku.qty : sku.qty - sku.printedCount,
      };
    });
    const data = {
      skus: mappedSkus,
      account: this.shipment.account,
      shipmentHeaderId: this.shipment.shipmentHeaderId,
    };

    return this.shipyardService.PrintSku(data).subscribe(
      (value: any) => {
        this.printLabel(value, "SkuLabel");
        this.loadShipment();
      },
      (err) =>
        this.snackBar.open("All labels were printed already", "Dismiss", {
          duration: 5000,
        })
    );
  }

  printSingleBox(event) {
    this.printBox(event, event);
  }

  printAllBoxLabels() {
    const boxArray = this.shipment.boxes.map((box) => box.boxNumber);
    const firstBox = boxArray[0];
    const lastBox = boxArray[boxArray.length - 1];
    this.printBox(firstBox, lastBox);
  }

  printBox(fromBox, toBox) {
    const data = {
      ship: this.shipment.amazonShipmentId,
      account: this.shipment.account,
      isOverszd: 0,
      fromBox: fromBox,
      toBox: toBox,
      qty: 1,
    };

    return this.shipmentService
      .GetBoxLabelNew(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: any) => {
        this.printLabel(value, "BoxLabel");
      });
  }

  printLabel(printObject, downloadName?: string) {
    switch (this.printer.printer) {
      case "Preview in browser":
        window.open(URL.createObjectURL(printObject.body), "_blank");
        break;
      case "Save as pdf":
      default:
        saveAs(printObject.body, `${downloadName}.pdf`);
        break;
    }
  }

  printAll2DLabels() {
    const boxArray = this.shipment.boxes.map((box) => box.boxNumber);
    const firstBox = boxArray[0];
    const lastBox = boxArray[boxArray.length - 1];
    this.print2DLabels(firstBox, lastBox);
  }
  printSingle2DLabels(box) {
    this.print2DLabels(box, box);
  }
  print2DLabels(fromBox, toBox) {
    const data = {
      ship: this.shipment.amazonShipmentId,
      account: this.shipment.account,
      isOverszd: 0,
      fromBox: fromBox,
      toBox: toBox,
      qty: 1,
    };

    this.shipmentService
      .GetBoxLabel2D(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: any) => {
        this.printLabel(value, "2D-box-label");
      });
  }

  addSku() {
    //give ability to select qty and to add multiple skus are once
    this.dialog
      .open(AddSkuToCurrentShipmentComponent, {
        width: "700px",
      })
      .afterClosed()
      .subscribe((e: { sku: string; qty: number }[]) => {
        if (e && e.length) {
          this.shipyardService
            .EditShipmentSku({
              skus: e,
              shipmentHeaderId: this.shipment.shipmentHeaderId,
              appendQty: false,
            })
            .subscribe((e) => {
              this.loadShipment();
            });
        }
      });
  }

  scanInSkuList(fnsku) {
    this.shipyardService
      .EditShipmentSku({
        skus: [
          {
            sku: fnsku,
            qty: 1,
          },
        ],
        shipmentHeaderId: this.shipment.shipmentHeaderId,
        appendQty: true,
      })
      .subscribe((e) => this.loadShipment());
  }

  scanInBox(boxId, fnsku) {
    this.addSkuToBox(fnsku, [1], boxId, true);
  }

  setScanner() {
    this.scannerService.scanned
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => {
        if (this.scanInto === "sku") {
          this.scanInSkuList(e);
        } else if (this.scanInto) {
          this.scanInBox(this.scanInto, e);
        } else {
          this.snackBar.open(
            "Please click the scan button on a box or on the SKU list",
            "Dismiss",
            { duration: 3000 }
          );
        }
      });
  }

  clearShipment() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: "600px",
      data: {
        title: "Clear Shipment",
        message: `Are you sure you want to clear the skus and the boxes from this shipment?`,
      },
    });

    dialog
      .afterClosed()
      .pipe(filter((e) => e === "Confirm"))
      .subscribe(() =>
        this.shipyardService
          .ClearShipment(this.shipment.shipmentHeaderId, true)
          .subscribe((e) => this.loadShipment())
      );
  }

  mergeShipment() {
    this.dialog
      .open(AddSkuToShipmentComponent, {
        width: "1000px",
        data: this.shipment,
      })
      .afterClosed()
      .pipe(filter((e) => e))
      .subscribe((e) => {
        console.log(e);
      });
  }

  deleteShipmentDraft() {
    this.shipyardService
      .DeleteShipmentDraft(this.shipment.shipmentHeaderId)
      .subscribe((e) => {
        this.router.navigate(["shipyard/shipments"]);
      });
  }

  completeShipment(submitBoxContent: boolean) {
    const skus = JSON.parse(JSON.stringify(this.shipment.skus));
    const itemsNotBoxed = skus
      .filter((sku: ShipmentSku) => {
        return sku.qty - sku.totalBoxed > 0;
      })
      .map((sku) => {
        return { ...sku, qty: sku.qty - sku.totalBoxed };
      });
    if (itemsNotBoxed.length) {
      this.dialog
        .open(ItemOverflowDialogComponent, {
          width: "700px",
          data: {
            title: "Close shipment",
            message: `The following SKU's are not boxed.`,
            itemsNotBoxed,
            actions: [
              { text: "Cancel", buttonStyle: "text", buttonSize: "action" },
              {
                text: "Remove from shipment",
                buttonStyle: "text",
                buttonSize: "action",
              },
              { text: "Move to new draft", buttonSize: "medium" },
            ],
          },
        })
        .afterClosed()
        .subscribe((e) => {
          if (e === "Move to new draft") {
            this.executeCompleteShipment(submitBoxContent, true);
          } else if (e === "Remove from shipment") {
            this.executeCompleteShipment(submitBoxContent);
          }
        });
    } else {
      this.executeCompleteShipment(submitBoxContent);
    }
  }

  executeCompleteShipment(submitBoxContent: boolean, overFlowToDraft = false) {
    this.shipyardService
      .CompleteShipment(
        this.shipment.shipmentHeaderId,
        submitBoxContent,
        overFlowToDraft
      )
      .subscribe(
        (e) => {
          this.router.navigate(["shipyard/shipments"]);
        },
        (err) => {
          this.snackBar.open(err.error.error[0], "Dismiss", {
            duration: 30000,
          });
        }
      );
  }

  removeSkuFromBox(sku: ShipmentSku, boxId: number) {
    this.shipyardService
      .RemoveSkuFromBox(sku.sku, this.shipment.shipmentHeaderId, sku.qty, boxId)
      .subscribe((e) => this.loadShipment());
  }

  // dragStarted(event: { source: CdkDrag }) {
  //   console.log(event);

  //   setTimeout(() => {
  //     const dropContainer = event.source._dragRef['_dropContainer'];

  //     if (dropContainer) {
  //       dropContainer['_cacheOwnPosition']();
  //       dropContainer['_cacheItemPositions']();
  //     }
  //   });
  // }

  // addToExistingBox(sku: ShipmentSku, boxId, qty?) {
  //   if (qty) {
  //   }
  //   this.addToExistingBoxEvent.emit({
  //     sku: sku.sku,
  //     boxId,
  //     qty: sku.qty - sku.totalBoxed,
  //   });
  // }
}
