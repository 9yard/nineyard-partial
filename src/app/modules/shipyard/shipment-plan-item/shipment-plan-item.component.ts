import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-shipment-plan-item",
  templateUrl: "./shipment-plan-item.component.html",
  styleUrls: ["./shipment-plan-item.component.scss"],
})
export class ShipmentPlanItemComponent implements OnInit {
  @Input() plan;
  constructor() {}

  ngOnInit(): void {}
  openInGoogleMaps(query) {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=" + query,
      "_blank"
    );
  }
}
