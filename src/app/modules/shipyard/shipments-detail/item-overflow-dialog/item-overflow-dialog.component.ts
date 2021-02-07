import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-item-overflow-dialog",
  templateUrl: "./item-overflow-dialog.component.html",
  styleUrls: ["./item-overflow-dialog.component.scss"],
})
export class ItemOverflowDialogComponent implements OnInit {
  actions: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ItemOverflowDialogComponent>
  ) {}

  ngOnInit(): void {
    this.actions = this.data.actions || [
      { text: "Cancel", buttonStyle: "underline" },
      { text: "Confirm" },
    ];
  }

  close(e?) {
    this.dialogRef.close(e);
  }
}
