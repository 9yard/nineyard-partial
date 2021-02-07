import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-print-lables-dialog",
  templateUrl: "./print-lables-dialog.component.html",
  styleUrls: ["./print-lables-dialog.component.scss"],
})
export class PrintLablesDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PrintLablesDialogComponent>
  ) {}

  ngOnInit(): void {}

  action(event) {
    if (event === "Confirm") {
      console.log(event);
      // Print
      this.dialogRef.close(event);
    } else {
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
