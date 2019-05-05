import {Injectable} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
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
  private _validationMessages: Observable<{[key: string]: any}>;

  get validationMessages() {
    if (!this._validationMessages) {
      this.initializeValidationMessage();
    }
    return this._validationMessages;
  }

  constructor(private translateService: TranslateService) {}

  /**
   * Method called to initialize the common validation messages
   */
  private initializeValidationMessage() {
    // the call to stream with placeholder key (which is a fake key) is used to be sure we
    // have a translation when calling instant
    this._validationMessages = this.translateService.stream('fake-placehold').pipe(
      map(() => ({
        required: {
          required: this.translateService.instant('common.validators.required'),
        },
        invalid: {
          pattern: this.translateService.instant('common.validators.invalid'),
        },
        length: {
          minlength: {
            minlength: (validationErrors: ValidationErrors) =>
              this.translateService.instant('common.validators.length.min', {min: validationErrors.requiredLength}),
          },
          maxlength: {
            maxlength: (validationErrors: ValidationErrors) =>
              this.translateService.instant('common.validators.length.max', {max: validationErrors.requiredLength}),
          },
        },
        numbers: {
          decimal: {
            pattern: {
              pattern: this.translateService.instant('common.validators.numbers.decimal.pattern'),
            },
          },
          integer: {
            pattern: {
              pattern: this.translateService.instant('common.validators.numbers.integer.pattern'),
            },
          },
          min: {
            min: (validationErrors: any) => this.translateService.instant('common.validators.numbers.min', {min: validationErrors.min}),
          },
          max: {
            max: (validationErrors: any) => this.translateService.instant('common.validators.numbers.max', {max: validationErrors.max}),
          },
        },
      }))
    );
  }
}
