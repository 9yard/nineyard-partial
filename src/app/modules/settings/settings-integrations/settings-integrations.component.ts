import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-settings-integrations',
  templateUrl: './settings-integrations.component.html',
  styleUrls: ['./settings-integrations.component.scss']
})
export class SettingsIntegrationsComponent implements OnInit, OnDestroy {
  public accounts: any;
  private destroy$ = new Subject<void>();
  accountsCount: number = 0;

  marketplaces = [
    {
      name: "Amazon",
      connectedAccount: [],
    },
    {
      name: "Walmart",
      connectedAccount: [],
    },
  ];
  constructor(public dialogRef: MatDialog, private settingsService: SettingsService) { }

  ngOnInit() {
    this.getAccounts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  getAccounts() {
    this.settingsService.GetAccountsByType().pipe(takeUntil(this.destroy$)).subscribe((accounts: any) => {
      accounts.forEach((element) => {
        this.marketplaces.forEach((marketplace) => {
          if (element.type == marketplace.name) {
            this.accountsCount++;
            marketplace.connectedAccount.push(element);
          }
        });
      });
    });

  }

  refreshAccounts() {
    this.marketplaces.forEach((marketplace) => marketplace.connectedAccount = []);
    this.getAccounts()
  }

}
