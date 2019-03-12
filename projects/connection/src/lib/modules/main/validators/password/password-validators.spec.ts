import {async} from '@angular/core/testing';
import {FormControl, ValidationErrors} from '@angular/forms';
import {PasswordValidators, PasswordValidatorsMessages} from './password-validators';

const prefix = 'my-prefix';

describe('PasswordValidators', () => {
  describe('#beginWithValidator', () => {
    test('should return null for valid control', async(() => {
      const formValue = `${prefix}-my-value`;
      const validFormControl: FormControl = new FormControl(formValue, PasswordValidators.beginWithValidator(prefix));
      expect(validFormControl.errors).toEqual(null);
    }));

    test('should return the invalid control information', () => {
      const formValue = `uncorrect-value`;
      const expectedErrors = {
        beginsWith: {
          value: formValue,
          prefix,
        },
      };
      const validFormControl: FormControl = new FormControl(formValue, PasswordValidators.beginWithValidator(prefix));
      expect(validFormControl.errors).toEqual(expectedErrors);
    });
  });
});

describe('PasswordValidatorsMessages', () => {
  describe('#beginsWith', () => {
    test('should match snapshot when value inquired', () => {
      const value = 'my-value';
      const validationErrors: ValidationErrors = {
        value,
        prefix,
      };
      expect(PasswordValidatorsMessages.beginsWith.beginsWith(validationErrors)).toMatchSnapshot();
    });
    test('should match snapshot when value not inquired', () => {
      const validationErrors: ValidationErrors = {
        prefix,
      };
      expect(PasswordValidatorsMessages.beginsWith.beginsWith(validationErrors)).toMatchSnapshot();
    });
  });
});
