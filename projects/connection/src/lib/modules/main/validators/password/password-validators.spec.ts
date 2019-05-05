import {async, TestBed} from '@angular/core/testing';
import {FormControl, ValidationErrors} from '@angular/forms';
import * as TRANSLATIONS_EN from '@i18n/common/en.json';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {PasswordValidators, PasswordValidatorsMessagesService} from './password-validators';

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
  let passwordValidatorsMessagesService: PasswordValidatorsMessagesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations('fr', TRANSLATIONS_EN)],
      providers: [PasswordValidatorsMessagesService],
    });
  }));

  // initialize services
  beforeEach(() => {
    passwordValidatorsMessagesService = TestBed.get(PasswordValidatorsMessagesService);
  });

  describe('#beginsWith', () => {
    test('should match snapshot when value inquired', async(() => {
      const value = 'my-value';
      const validationErrors: ValidationErrors = {
        value,
        prefix,
      };

      passwordValidatorsMessagesService
        .beginsWith()
        .subscribe((passwordValidatorsMessages: {beginsWith: (validationErrors: ValidationErrors) => string}) => {
          expect(passwordValidatorsMessages.beginsWith(validationErrors)).toMatchSnapshot();
        });
    }));

    test('should match snapshot when value not inquired', async(() => {
      const validationErrors: ValidationErrors = {
        prefix,
      };
      passwordValidatorsMessagesService
        .beginsWith()
        .subscribe((passwordValidatorsMessages: {beginsWith: (validationErrors: ValidationErrors) => string}) => {
          expect(passwordValidatorsMessages.beginsWith(validationErrors)).toMatchSnapshot();
        });
    }));
  });
});
