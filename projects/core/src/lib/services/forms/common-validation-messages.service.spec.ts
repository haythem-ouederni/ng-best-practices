import {async, TestBed} from '@angular/core/testing';
import {CommonValidationMessagesService} from './common-validation-messages.service';

describe('CommonValidationMessages', () => {
  let service: CommonValidationMessagesService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({});
  }));

  beforeEach(() => {
    service = TestBed.get(CommonValidationMessagesService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should match snapshot', () => {
    expect(service).toMatchSnapshot();
  });

  test('#validationMessages should match snapshot', () => {
    expect(service.validationMessages).toMatchSnapshot();
  });
});
