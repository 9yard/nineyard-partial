import {
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

const REPRICE_MODEL_INPUT: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RepriceModelInputComponent),
  multi: true,
};

@Component({
  selector: "app-reprice-model-input",
  templateUrl: "./reprice-model-input.component.html",
  styleUrls: ["./reprice-model-input.component.scss"],
  providers: [REPRICE_MODEL_INPUT],
})
export class RepriceModelInputComponent
  implements ControlValueAccessor, OnInit {
  form: FormGroup;
  custom: boolean;
  increase: boolean;
  value: RepriceInputValue;
  isPercent: string = "D";
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      select: ["Match"],
      custom: "0",
    });

    const selectValues$ = this.form.get("select").valueChanges;
    const customValues$ = this.form.get("custom").valueChanges;
    selectValues$.subscribe((e) => {
      if (e === "Increase" || e === "Decrease") {
        this.custom = true;
        if (e === "Increase") {
          this.increase = true;
        } else {
          this.increase = false;
        }
        this.updateValue(this.form.get("custom").value, false);
      } else if (e === "BeatAggressively") {
        this.updateValue(0, true);
      } else if (e === "Match") {
        this.updateValue(0, false);
      } else {
        this.custom = false;
      }
    });

    customValues$.subscribe((e) => {
      this.updateValue(e, false);
    });

    this.updateValue(0, false);
  }

  toggleInputType() {
    this.custom = !this.custom;
    this.form.get("select").patchValue("Match");
  }

  togglePercentOrDollar(e: string) {
    this.isPercent = e.charAt(0).toUpperCase();
    this.updateValue(this.form.get("custom").value, false);
  }

  updateValue(value, isAgressive) {
    this.value = {
      percentOrDollar: this.isPercent,
      value: this.increase ? +value : -value,
      isAgressive: isAgressive,
    };

    this.emitChanges();
  }

  parseInput(value: any) {
    if (value) {
      if (value.isAgressive) {
        this.form.get("select").setValue("BeatAggressively")
      } else if(value.value === 0) {
        this.form.get("select").setValue("Match")
      } else {
        this.custom = true;
        this.isPercent = value.percentOrDollar;
        this.form.get("custom").setValue(Math.abs(value.value))
        if (value.value >= 0) {
          this.increase = true;
        } else {
          this.increase = false;
        }
      }
    }
  }

  OnChange = (_: any) => {};

  emitChanges() {
    this.OnChange(this.value);
  }

  writeValue(val: any): void {
    this.value = val;
    this.parseInput(this.value)
  }

  registerOnChange(fn: any): void {
    this.OnChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    // Implement Later;
  }
}

interface RepriceInputValue {
  percentOrDollar: string;
  value: number;
  isAgressive: boolean;
}
