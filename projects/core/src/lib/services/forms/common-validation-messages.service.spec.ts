import {async, TestBed} from '@angular/core/testing';
import * as TRANSLATIONS_EN from '@i18n/common/en.json';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {CommonValidationMessagesService} from './common-validation-messages.service';

describe('CommonValidationMessages', () => {
  let service: CommonValidationMessagesService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations('fr', TRANSLATIONS_EN)],
    });
  }));

  beforeEach(() => {
    service = TestBed.get(CommonValidationMessagesService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('#validationMessages should match snapshot', async(() => {
    service.validationMessages.subscribe((validationMessages: {[key: string]: any}) => {
      expect(validationMessages).toMatchSnapshot();
    });
  }));
});
