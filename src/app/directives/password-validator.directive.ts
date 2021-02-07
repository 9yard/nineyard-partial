import { Directive } from "@angular/core";
import { Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";

export function ValidatePassword(
  control: AbstractControl
): { [key: string]: any } | null {
  let score = 0;
  if (control.value) {
    if (control.value.length >= 8) score++;
    if (control.value.match("[a-z]+") && control.value.match("[A-Z]+")) score++;
    if (control.value.match("[!,@,#,$,%,^,&,*,?,_,~,-,£,(,)]+")) score++;
    if (control.value.length >= 12) score = 3;
  }
  if (score >= 3) {
    return null;
  } else {
    return { weakPassword: { value: control.value } };
  }
}

@Directive({
  selector: "[appPasswordValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return ValidatePassword(control);
  }
}
