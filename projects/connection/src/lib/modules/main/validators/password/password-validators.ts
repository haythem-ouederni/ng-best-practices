import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class PasswordValidators {
  static beginWithValidator(prefix: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const beginsWith = control.value && control.value.indexOf(prefix) === 0;
      return !beginsWith ? {beginsWith: {value: control.value, prefix}} : null;
    };
  }
}

export class PasswordValidatorsMessages {
  static beginsWith = {
    beginsWith: (validationErrors: ValidationErrors) =>
      validationErrors.value
        ? `${validationErrors.value} must begin with ${validationErrors.prefix}`
        : `Must begin with ${validationErrors.prefix}`,
  };
}
