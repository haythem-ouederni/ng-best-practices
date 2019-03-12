import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class UsernameValidators {
  static containsValidator(content: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const contains = control.value && control.value.indexOf(content) > -1;
      return !contains ? {contains: {value: control.value, content}} : null;
    };
  }
}

export class UsernameValidatorsMessages {
  static contains = {
    contains: (validationErrors: ValidationErrors) =>
      validationErrors.value
        ? `${validationErrors.value} must contain ${validationErrors.content}`
        : `Must contain ${validationErrors.content}`,
  };
}
