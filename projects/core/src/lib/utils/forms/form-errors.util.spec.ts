import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ErrorMessageFunction, FormControlValidationErrorsMessages, FormGroupValidationErrorsMessages} from '../../models';
import {FormErrorsUtil} from './form-errors.util';

describe('FormErrorsUtil', () => {
  let form: FormGroup;
  const messages: FormControlValidationErrorsMessages = {
    required: 'Required Message',
    number: 'ça doit être un entier',
    minValue: (validationErrors: ValidationErrors) => `La valeur minimale est ${validationErrors.min}`,
  };

  const validationMessages: FormGroupValidationErrorsMessages = {
    controlField1: {
      required: messages.required,
      min: messages.minValue,
      pattern: messages.number,
    },
    controlField2: {
      required: messages.required,
    },
  };

  const minValue = 3;

  beforeEach(() => {
    // initialize the form group
    form = new FormGroup({
      controlField1: new FormControl(8, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(minValue)]),
      controlField2: new FormControl('value', [Validators.required]),
    });
  });

  describe('#aggregateErrors', () => {
    test('should return empty errors', () => {
      const formErrors = FormErrorsUtil.aggregateErrorsMessages(form, validationMessages);
      expect(formErrors).toEqual({});
    });

    describe('when test on one field', () => {
      test('should return required error', () => {
        form.controls['controlField1'].setValue(null);
        const formErrors = FormErrorsUtil.aggregateErrorsMessages(form, validationMessages);
        const expected = {controlField1: [messages.required]};
        expect(formErrors).toEqual(expected);
      });

      test('should return min and pattern error', () => {
        form.controls['controlField1'].setValue('1h2');
        const formErrors = FormErrorsUtil.aggregateErrorsMessages(form, validationMessages);
        const expected = {controlField1: [messages.number, (messages.minValue as ErrorMessageFunction)({min: minValue})]};
        expect(formErrors).toEqual(expected);
      });
    });

    describe('when test on multiple fields', () => {
      test('should return required error', () => {
        form.controls['controlField1'].setValue(null);
        form.controls['controlField2'].setValue(null);
        const formErrors = FormErrorsUtil.aggregateErrorsMessages(form, validationMessages);
        const expected = {controlField1: [messages.required], controlField2: [messages.required]};
        expect(formErrors).toEqual(expected);
      });
    });
  });
});
