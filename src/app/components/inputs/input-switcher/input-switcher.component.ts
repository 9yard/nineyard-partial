import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-input-switcher",
  templateUrl: "./input-switcher.component.html",
  styleUrls: ["./input-switcher.component.scss"],
})
export class InputSwitcherComponent implements OnInit {
  @Input() options: string[];
  @Output() optionSelected: EventEmitter<string> = new EventEmitter();
  private _selectedOption: string;
  get selectedOption(): string {
    return this._selectedOption;
  }

  @Input() set selectedOption(newName: string) {
    this.optionSelected.emit(newName);
    this._selectedOption = newName;
  }

  constructor() {}

  ngOnInit(): void {
    if (!this.selectedOption) {
      this.selectedOption =  this.options[0];
    }
  }
}
