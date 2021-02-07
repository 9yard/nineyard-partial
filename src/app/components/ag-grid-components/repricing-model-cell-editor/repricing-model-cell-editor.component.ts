import { Component, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";

import { Subject } from "rxjs";
import { filter, map, startWith, takeUntil } from "rxjs/operators";
import { RepriceListItem } from "src/app/models/priceyard.model";

@Component({
  selector: "app-repricing-model-cell-editor",
  templateUrl: "./repricing-model-cell-editor.component.html",
  styleUrls: ["./repricing-model-cell-editor.component.scss"],
})
export class RepricingModelCellEditorComponent implements OnDestroy {
  editModel = true;
  params: any;
  myControl = new FormControl();
  filteredOptions: any;
  options;
  private destroy$ = new Subject<void>();

  agInit(params: any): void {
    this.params = params;
    this.params[0]
      .pipe(
        takeUntil(this.destroy$),
        map((models: RepriceListItem[]) =>
          models.filter(
            (model: RepriceListItem) => model.marketPlace === this.params.data.AccountType
          )
        )
      )
      .subscribe((e) => {
        this.options = e;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          takeUntil(this.destroy$),
          startWith(""),
          map((value) => this._filter(value))
        );

        const myModel = this.params.data.Prmodel.modelId;
        const optionIndex = this.options
          .map((e) => {
            return e.modelId;
          })
          .indexOf(myModel);
        this.myControl.setValue(this.options[optionIndex]);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    console.log("test");
  }

  displayFn(model): string {
    return model && model.name ? model.name : "";
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  getValue() {
    if (this.myControl.value) {
      return {
        isActive: !this.params.data.Prmodel.modelId
          ? true
          : this.params.data.Prmodel.isActive,
        modelId: this.myControl.value.modelId,
        name: this.myControl.value.name,
      };
    } else {
      return {
        isActive: this.params.data.Prmodel.isActive,
        modelId: null,
        name: null,
      };
    }
  }

  save() {
    this.params.stopEditing();
  }

  removeModel() {
    this.myControl.reset();
    this.params.stopEditing();
  }

  toggleSkuPricingModel(isActive) {
    this.params.data.Prmodel.isActive = !isActive;
    this.params.stopEditing();
  }
}
