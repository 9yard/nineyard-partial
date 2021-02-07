import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

import { SettingsService } from "src/app/services/settings.service";
import { OnboardingService } from "src/app/services/onboarding.service";

import { Observable, Subject } from "rxjs";

import { takeUntil } from "rxjs/operators";

import { AccountByType } from "../../models/account.model";

@Component({
  selector: "app-marketplace-connections",
  templateUrl: "./marketplace-connections.component.html",
  styleUrls: ["./marketplace-connections.component.scss"],
})
export class MarketplaceConnectionsComponent implements OnInit, OnDestroy {
  @Input() marketplace: string;
  @Input() connectedAccounts: AccountByType[];
  @Output() refresh: EventEmitter<boolean> = new EventEmitter();
  isConnecting: boolean;
  accounts$: Observable<AccountByType>;
  private destroy$ = new Subject<void>();

  constructor(
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
  
  refreshAccounts() {
    this.isConnecting = false;
    this.refresh.emit(true);
  }
}
