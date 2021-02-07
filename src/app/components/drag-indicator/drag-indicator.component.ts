import { Component, Input, OnInit, EventEmitter } from "@angular/core";

@Component({
  selector: "app-drag-indicator",
  templateUrl: "./drag-indicator.component.html",
  styleUrls: ["./drag-indicator.component.scss"],
})
export class DragIndicatorComponent implements OnInit {
  @Input() actionType: string;
  @Input() dropped;
  @Input() isSmall;
  constructor() {}

  ngOnInit(): void {}
}
