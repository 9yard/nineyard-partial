import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loading-cell-renderer",
  templateUrl: "./loading-cell-renderer.component.html",
  styleUrls: ["./loading-cell-renderer.component.scss"],
})
export class LoadingCellRendererComponent {
  width = Math.random() * (35 - 25) + 30;

  private params: any;

  agInit(params): void {}
}
