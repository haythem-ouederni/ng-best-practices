import {async} from '@angular/core/testing';
import {FormControl, ValidationErrors} from '@angular/forms';
import {UsernameValidators, UsernameValidatorsMessages} from './username-validators';

const content = 'my-content';

describe('UsernameValidators', () => {
  describe('#containsValidator', () => {
    test('should return null for valid control', async(() => {
      const formValue = `my-value-${content}`;
      const validFormControl: FormControl = new FormControl(formValue, UsernameValidators.containsValidator(content));
      expect(validFormControl.errors).toEqual(null);
    }));

    test('should return the invalid control information', () => {
      const formValue = `uncorrect-value`;
      const expectedErrors = {
        contains: {
          value: formValue,
          content,
        },
      };
      const validFormControl: FormControl = new FormControl(formValue, UsernameValidators.containsValidator(content));
      expect(validFormControl.errors).toEqual(expectedErrors);
    });
  });
});

describe('UsernameValidatorsMessages', () => {
  describe('#contains', () => {
    test('should match snapshot when value inquired', () => {
      const value = 'my-value';
      const validationErrors: ValidationErrors = {
        value,
        content,
      };
      expect(UsernameValidatorsMessages.contains.contains(validationErrors)).toMatchSnapshot();
    });
    test('should match snapshot when value not inquired', () => {
      const validationErrors: ValidationErrors = {
        content,
      };
      expect(UsernameValidatorsMessages.contains.contains(validationErrors)).toMatchSnapshot();
    });
  });
});
