import { MatDialog } from "@angular/material/dialog";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

import { SettingsService } from "src/app/services/settings.service";

import { shareReplay } from "rxjs/internal/operators/shareReplay";
import { filter, tap } from "rxjs/operators";

import { AuthService } from "./../../services/auth.service";

import { HeaderService } from "./header.service";

import { ProcessesDialogComponent } from "./processes-dialog/processes-dialog.component";
import { UpdatesDialogComponent } from "./updates-dialog/updates-dialog.component";

export interface IBreadCrumb {
  label: string;
  url: string;
}

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
  public breadcrumbs: IBreadCrumb[];
  public breadcrumbsEnd: Object;
  public tempBreadcrumbs: IBreadCrumb[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public headerService: HeaderService,
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.tempBreadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    this.breadcrumbs = Object.assign([], this.tempBreadcrumbs);
    this.breadcrumbs.splice(-1, this.breadcrumbs.length);
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.tempBreadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      this.breadcrumbs = Object.assign([], this.tempBreadcrumbs);
      this.breadcrumbs.splice(-1, this.breadcrumbs.length);
    });

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

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = "",
    breadcrumbs: IBreadCrumb[] = []
  ): IBreadCrumb[] {
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.title
        : "";
    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : "";

    const lastRoutePart = path.split("/").pop();
    const isDynamicRoute = lastRoutePart.startsWith(":");
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(":")[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };

    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
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
