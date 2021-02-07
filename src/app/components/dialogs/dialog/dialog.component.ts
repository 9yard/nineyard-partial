import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() actions: string[];
  @Output() action: EventEmitter<string> = new EventEmitter();
  @Output() close: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  closeDialog() {
    this.close.emit();
  }

  emitAction(e) {
    this.action.emit(e);
  }
}
