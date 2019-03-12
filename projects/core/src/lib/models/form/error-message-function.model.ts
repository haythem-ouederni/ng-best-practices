import {ValidationErrors} from '@angular/forms';

export type ErrorMessageFunction = (validationErrors: ValidationErrors) => string;
