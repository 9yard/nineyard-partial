import { ICellEditorParams } from '@ag-grid-community/core';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-price-override-cell-editor',
  templateUrl: './price-override-cell-editor.component.html',
  styleUrls: ['./price-override-cell-editor.component.scss']
})
export class PriceOverrideCellEditorComponent implements AfterViewInit {
  params: ICellEditorParams;
  selectedValue;
  price;
  auto: boolean;
  @ViewChild('textInput') textInput;
  agInit(params: any): void {
    this.params = params;
    this.price = this.params.value.price;
    this.auto = this.params.value.isAuto;
  }

  getValue() {
    return {
      price: this.price,
      isAuto: this.auto
    };
  }

  setToAuto(isAuto) {
    this.auto = isAuto;
    if (this.auto) {
      this.textInput.nativeElement.disabled = true;
    } else {
      this.textInput.nativeElement.disabled = false;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
        this.textInput.nativeElement.focus();
    });
  }
  
  enter(e: KeyboardEvent) {
    e.preventDefault();
    this.textInput.nativeElement.blur();
    this.save();
  }

  save() {
    this.params.stopEditing();
  }

}
