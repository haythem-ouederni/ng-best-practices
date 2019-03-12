import {ErrorMessageFunction} from './error-message-function.model';

export interface FormControlValidationErrorsMessages {
  [key: string]: string | ErrorMessageFunction;
}
