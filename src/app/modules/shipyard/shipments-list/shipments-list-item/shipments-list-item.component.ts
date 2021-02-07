import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";

@Component({
  selector: "app-shipments-list-item",
  templateUrl: "./shipments-list-item.component.html",
  styleUrls: ["./shipments-list-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipmentsListItemComponent implements OnInit {
  @Input() shipment;
  constructor() {}

  ngOnInit(): void {}

  openOnAmazon() {
    window.open(
      `https://sellercentral.amazon.com/gp/fba/inbound-shipment-workflow/index.html#${this.shipment.amazonShipmentId}/summary/contents`,
      "_blank"
    );
  }
}
