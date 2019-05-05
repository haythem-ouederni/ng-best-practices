import {FormGroup} from '@angular/forms';
import {FormGroupFinalErrorsMessages, FormGroupValidationErrorsMessages, ErrorMessageFunction} from '../../models';

export class FormErrorsUtil {
  /**
   * Aggregates multiple validation errors messages.
   * For each formControl it will return a list of the related errors message
   * @param form : formGroup
   * @param validationErrorsMessages : An object containing the different errors messages for each field of the formgroup
   * @return a formErrors
   *
   * example of a validationMessages:
   * validationMessages = {
   *      age: {
   *          required: 'Age required.',
   *          min: (validationErrors: ValidationErrors) => `Age at least ${validationErrors.min}`,
   * }
   *
   */
  static aggregateErrorsMessages(
    form: FormGroup,
    validationErrorsMessages: FormGroupValidationErrorsMessages
  ): FormGroupFinalErrorsMessages {
    const formErrors: FormGroupFinalErrorsMessages = {};
    if (form && validationErrorsMessages) {
      Object.keys(validationErrorsMessages)
        .filter((key: string) => form.controls[key] && !form.controls[key].pending && form.controls[key].invalid)
        .forEach((key: string) => {
          formErrors[key] = [];
          Object.keys(form.controls[key].errors).forEach((error: string) => {
            let msg = '';
            if (typeof validationErrorsMessages[key][error] === 'function') {
              const msgFunction: ErrorMessageFunction = validationErrorsMessages[key][error] as ErrorMessageFunction;
              msg = msgFunction(form.controls[key].errors[error]);
            } else {
              msg = validationErrorsMessages[key][error] as string;
            }
            if (formErrors[key] && formErrors[key].length > 0) {
              formErrors[key].push(msg);
            } else {
              formErrors[key] = [msg];
            }
          });
        });
    }
    return formErrors;
  }
}
