import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class UsernameValidators {
  static containsValidator(content: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const contains = control.value && control.value.indexOf(content) > -1;
      return !contains ? {contains: {value: control.value, content}} : null;
    };
  }
}

@Injectable()
export class UsernameValidatorsMessagesService {
  constructor(private tanslateService: TranslateService) {}

  contains(): Observable<{contains: (validationErrors: ValidationErrors) => string}> {
    // the call to stream with placeholder key (which is a fake key) is used to be sure we
    // have a translation when calling instant
    return this.tanslateService.stream('fake-placehold').pipe(
      map(() => ({
        contains: (validationErrors: ValidationErrors) =>
          validationErrors.value
            ? this.tanslateService.instant('common.validators.contains.1', {
                value: validationErrors.value,
                content: validationErrors.content,
              })
            : this.tanslateService.instant('common.validators.contains.2', {
                content: validationErrors.content,
              }),
      }))
    );
  }
}
