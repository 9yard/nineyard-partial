import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DialogActions } from "../dialog.model";

@Component({
  selector: "app-dialog-footer",
  templateUrl: "./dialog-footer.component.html",
  styleUrls: ["./dialog-footer.component.scss"],
})
export class DialogFooterComponent implements OnInit {
  @Output() action: EventEmitter<string> = new EventEmitter();
  @Input() actions: DialogActions[];
  constructor() {}

  ngOnInit(): void {
    console.log(this.actions);
  }

  emitAction(e: string) {
    this.action.emit(e);
  }
}
