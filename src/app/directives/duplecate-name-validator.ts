import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { OnboardingService } from "../services/onboarding.service";

export function duplecateNameValidator(
    onboardingService: OnboardingService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return onboardingService
        .DuplicateAccountName(control.value)
        .pipe(
          map((result: boolean) => (!result ? null : { invalidAsync: true }))
        );
    };
  }