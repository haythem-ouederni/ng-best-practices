import {Injectable} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
/**
 * CommonValidatorMessagesService must be provided at each using module.
 * And tha calling module must load the common/fr.json file in addiction
 * to its own traduction files
 *
 * IMPORTANT : at the actual state of the service no need to add specific
 * unit test for it. Orignally, it simply returns a constant with fixed value.
 * It was transformed to a service just to be able to use the translation.
 *
 */
@Injectable({
  providedIn: 'root',
})
export class CommonValidationMessagesService {
  private _validationMessages: {[key: string]: any};

  get validationMessages() {
    if (!this._validationMessages) {
      this.initializeValidationMessage();
    }
    return this._validationMessages;
  }

  /**
   * Method called to initialize the common validation messages
   */
  private initializeValidationMessage() {
    this._validationMessages = {
      required: {
        required: 'Required input',
      },
      invalid: {
        pattern: 'Invalid input',
      },
      length: {
        minlength: {
          minlength: (validationErrors: ValidationErrors) => `The minimal length is ${validationErrors.requiredLength}`,
        },
        maxlength: {
          maxlength: (validationErrors: ValidationErrors) => `The maximal length is ${validationErrors.requiredLength}`,
        },
      },
      numbers: {
        decimal: {
          pattern: {
            pattern: 'Should be a number',
          },
        },
        integer: {
          pattern: {
            pattern: 'Should be an integer',
          },
        },
        min: {
          min: (validationErrors: any) => `The minimal value is ${validationErrors.min}`,
        },
        max: {
          max: (validationErrors: any) => `The maximal value is ${validationErrors.max}`,
        },
      },
    };
  }
}
