import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class PasswordValidators {
  static beginWithValidator(prefix: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const beginsWith = control.value && control.value.indexOf(prefix) === 0;
      return !beginsWith ? {beginsWith: {value: control.value, prefix}} : null;
    };
  }
}

@Injectable()
export class PasswordValidatorsMessagesService {
  constructor(private tanslateService: TranslateService) {}

  beginsWith(): Observable<{beginsWith: (validationErrors: ValidationErrors) => string}> {
    // the call to stream with placeholder key (which is a fake key) is used to be sure we
    // have a translation when calling instant
    return this.tanslateService.stream('fake-placeholder').pipe(
      map(() => ({
        beginsWith: (validationErrors: ValidationErrors) =>
          validationErrors.value
            ? this.tanslateService.instant('common.validators.begins_with.1', {
                value: validationErrors.value,
                prefix: validationErrors.prefix,
              })
            : this.tanslateService.instant('common.validators.begins_with.2', {
                prefix: validationErrors.prefix,
              }),
      }))
    );
  }
}
