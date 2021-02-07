import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-history',
  templateUrl: './settings-history.component.html',
  styleUrls: ['./settings-history.component.scss']
})
export class SettingsHistoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SettingsHistoryComponent>) { }

  ngOnInit() {
  }

}
