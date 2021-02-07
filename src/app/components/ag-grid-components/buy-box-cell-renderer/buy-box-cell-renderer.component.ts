import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-buy-box-cell-renderer",
  templateUrl: "./buy-box-cell-renderer.component.html",
  styleUrls: ["./buy-box-cell-renderer.component.scss"],
})
export class BuyBoxCellRendererComponent {
  priceClass: any = {};
  params: any;

  agInit(params: any): void {
    this.params = params;
    this.params.value.forEach((value) => {
      value.priceClass = {};
      value.priceClass["price--" + value["sellerType"]] = true;
      value.priceClass["price--is-yours"] = value.isYours;
      value.priceClass["price--is-below-minumum"] = this.params.data["Minpr"].price < this.params.value.price;
    });
  }
}
