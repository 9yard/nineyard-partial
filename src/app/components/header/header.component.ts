import { MatDialog } from "@angular/material/dialog";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

import { SettingsService } from "src/app/services/settings.service";

import { shareReplay } from "rxjs/internal/operators/shareReplay";
import { tap } from "rxjs/operators";

import { AuthService } from "./../../services/auth.service";

import { HeaderService } from "./header.service";

import { ProcessesDialogComponent } from "./processes-dialog/processes-dialog.component";
import { UpdatesDialogComponent } from "./updates-dialog/updates-dialog.component";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  accounts;
  allMarketPlaces;
  selectedAccount;
  hasUpdates: boolean = true;
  accountTypes;
  @ViewChild("processingElement") processingElement: ElementRef;
  processes: PendingProcess[] = [];
  accountDropdownDisabled = false;

  private hubConnection: HubConnection;
  constructor(
    public headerService: HeaderService,
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.accounts = this.settingsService.GetAccountsByType().pipe(
      shareReplay(1),
      tap((e) => {
        this.selectedAccount = e[0].name;
        this.accountSelected();
        this.allMarketPlaces = this.generateAllMarketPlaces(e);
      })
    );

    const connection = (this.hubConnection = new HubConnectionBuilder()
      .withUrl(
        `https://staging.datavanced.com/hub/signalr?access_token=${this.authService.getToken()}&tenant_id=${this.authService.getTenantId()} `
      )
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build());

    connection.start();
    connection.on("send", (data: PendingProcess) => {
      if (this.isItemInProcessArray(data.id)) {
        this.updateItemInProcess(data);
      } else {
        this.addItemToProcesses(data);
      }
      if (
        data.response.responseType === "success" ||
        data.response.responseType === "done" ||
        data.response.responseType === "error"
      ) {
        setTimeout(() => this.removeItemFromProcesses(data.id), 3000);
        this.headerService.remoteActionBroadcaster.next(data.action);
      }
      console.log(data);
    });

    this.headerService.accountsSelectDisabled.subscribe(
      (e: boolean) => (this.accountDropdownDisabled = e)
    );
  }

  isItemInProcessArray(itemId) {
    return (
      this.processes.filter((process: PendingProcess) => process.id === itemId)
        .length > 0
    );
  }

  addItemToProcesses(item: PendingProcess) {
    this.processes.push(item);
  }

  updateItemInProcess(item: PendingProcess) {
    this.processes = mergeArray(this.processes, item);
  }

  removeItemFromProcesses(itemId) {
    this.processes = this.processes.filter((item) => item.id !== itemId);
  }

  accountsChanged() {}

  accountSelected() {
    this.headerService.accountsSelected.next([this.selectedAccount]);
  }

  selectAllMarketPlace() {}

  openUpdatesDialog() {
    this.dialog.open(UpdatesDialogComponent, {
      width: "160px",
      maxHeight: "220px",
      position: {
        top: "47px",
        right: "113px",
      },
      backdropClass: "cdk-overlay-transparent-backdrop",
    });
  }

  generateAllMarketPlaces(accounts) {
    const array = accounts.map((account) => account.type.toLowerCase());
    this.accountTypes = new Set(array);
    this.headerService.accountTypes$.next(this.accountTypes);
  }

  openProcesses() {
    const elementWidth = this.processingElement.nativeElement.offsetWidth;
    const leftOfset = this.processingElement.nativeElement.offsetLeft;

    this.dialog.open(ProcessesDialogComponent, {
      backdropClass: "cdk-overlay-transparent-backdrop",
      panelClass: "process-dialog",
      width: elementWidth + "px",
      position: {
        top: "57px",
        left: leftOfset + "px",
      },
      data: this.processes,
    });
  }

  //generate alll marketplaces
  // value will be array of intergration ID
}

interface PendingProcess {
  action: string;
  id: string;
  response: {
    message: string;
    responseType: string;
  };
}

const mergeArray = (arr, obj) =>
  arr && arr.map((t) => (t.id === obj.id ? obj : t));
