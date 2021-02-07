import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-processes-dialog",
  templateUrl: "./processes-dialog.component.html",
  styleUrls: ["./processes-dialog.component.scss"],
})
export class ProcessesDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ProcessesDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log("this.data", this.data);
  }
}
