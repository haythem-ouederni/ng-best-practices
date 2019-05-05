import {async, TestBed} from '@angular/core/testing';
import {FormControl, ValidationErrors} from '@angular/forms';
import * as TRANSLATIONS_EN from '@i18n/common/en.json';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {UsernameValidators, UsernameValidatorsMessagesService} from './username-validators';

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
  let usernameValidatorsMessagesService: UsernameValidatorsMessagesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations('fr', TRANSLATIONS_EN)],
      providers: [UsernameValidatorsMessagesService],
    });
  }));

  // initialize services
  beforeEach(() => {
    usernameValidatorsMessagesService = TestBed.get(UsernameValidatorsMessagesService);
  });

  describe('#contains', () => {
    test('should match snapshot when value inquired', async(() => {
      const value = 'my-value';
      const validationErrors: ValidationErrors = {
        value,
        content,
      };

      usernameValidatorsMessagesService
        .contains()
        .subscribe((usernameValidatorsMessages: {contains: (validationErrors: ValidationErrors) => string}) => {
          expect(usernameValidatorsMessages.contains(validationErrors)).toMatchSnapshot();
        });
    }));
    test('should match snapshot when value not inquired', async(() => {
      const validationErrors: ValidationErrors = {
        content,
      };
      usernameValidatorsMessagesService
        .contains()
        .subscribe((usernameValidatorsMessages: {contains: (validationErrors: ValidationErrors) => string}) => {
          expect(usernameValidatorsMessages.contains(validationErrors)).toMatchSnapshot();
        });
    }));
  });
});
