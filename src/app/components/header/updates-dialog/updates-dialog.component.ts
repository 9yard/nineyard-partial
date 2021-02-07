import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updates-dialog',
  templateUrl: './updates-dialog.component.html',
  styleUrls: ['./updates-dialog.component.scss']
})
export class UpdatesDialogComponent implements OnInit {
  updates = ['test', 'and test lorem', 'and test lorem','and test lorem','and test lorem','and test lorem','and test lorem']
  constructor() { }

  ngOnInit(): void {
  }



}
