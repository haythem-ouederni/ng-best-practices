import {FormControlValidationErrorsMessages} from './form-control-validation-errors-messages.model';

export interface FormGroupValidationErrorsMessages {
  [key: string]: FormControlValidationErrorsMessages;
}
