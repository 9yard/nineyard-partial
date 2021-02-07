import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";

import { ShipmentBox } from "src/app/models/shipyard.model";

import { ShipyardService } from "./../../shipyard.service";

@Component({
  selector: "app-shipment-box",
  templateUrl: "./shipment-box.component.html",
  styleUrls: ["./shipment-box.component.scss"],
})
export class ShipmentBoxComponent implements OnInit {
  @Input() box: ShipmentBox;
  @Input() expanded;
  @Input() scanInto: string | number;
  @Input() otherIds: string[];
  @Output() scanningChanged: EventEmitter<string | number> = new EventEmitter();
  @Output() droped = new EventEmitter();
  @Output() scanned: EventEmitter<string> = new EventEmitter();
  @Output() emptyBoxEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteBoxEvent: EventEmitter<any> = new EventEmitter();
  @Output() printBoxEvent: EventEmitter<any> = new EventEmitter();
  @Output() print2DEvent: EventEmitter<any> = new EventEmitter();
  constructor(public shipyardService: ShipyardService) {}

  ngOnInit(): void {
    this.shipyardService.dropListIds.push(
      this.box.boxId + "-all",
      this.box.boxId + "-some"
    );
  }

  drop(event) {
    this.droped.emit(event);
  }

  scan(e) {
    e.stopPropagation();
    const emitValue = this.scanInto === this.box.boxId ? null : this.box.boxId;
    this.scanningChanged.emit(emitValue);
  }

  cancelPropergation(e: MouseEvent) {
    e.stopPropagation();
  }

  emptyBox(boxId) {
    this.emptyBoxEvent.emit(boxId);
  }

  deleteBox(boxId) {
    this.deleteBoxEvent.emit(boxId);
  }

  printBox(boxId) {
    this.printBoxEvent.emit(boxId);
  }

  print2DBox(boxId) {
    this.print2DEvent.emit(boxId);
  }
}
