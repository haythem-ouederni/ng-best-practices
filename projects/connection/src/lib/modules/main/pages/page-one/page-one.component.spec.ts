import {FormErrorsUtil} from '@abpe/core';
import {SharedModule} from '@abpe/shared';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngxs/store';
import {ComponentTester, speculoosMatchers, TestButton, TestInput} from 'ngx-speculoos';
import {of, Subject, Subscription} from 'rxjs';
import {ConnectionService} from '../../services';
import {CONNECTION_PATH} from '../../services/token';
import {ConnectionFacade} from '../../state';
import {PageOneComponent} from './page-one.component';

class PageOneComponentTester extends ComponentTester<PageOneComponent> {
  constructor() {
    super(PageOneComponent);
  }

  getUsernameInput(): TestInput {
    return this.input('#username');
  }

  getPasswordInput(): TestInput {
    return this.input('#password');
  }

  getAgeInput(): TestInput {
    return this.input('#age');
  }

  getSubmitBtn(): TestButton {
    return this.button('#submit');
  }
}

/**
 * Here is an example of a test file where I tried to go through many examples. At the same time, it does
 * not test all the method and case of PageOneComponent. It will be enriched when the need is felt or when other
 * developer ask for it.
 * TODO : complete with tests when needed
 */
describe('PageOneComponent', () => {
  let component: PageOneComponent;
  let fixture: ComponentFixture<PageOneComponent>;
  let tester: PageOneComponentTester;
  let connectionService: ConnectionService;

  // spies
  let calculateSpy: jest.SpyInstance;
  let initFormSpy: jest.SpyInstance;
  let initSubjectsSpy: jest.SpyInstance;
  let ngOnInitSpy: jest.SpyInstance;
  let initFormControlsSpy: jest.SpyInstance;
  let buildValidationErrorsSpy: jest.SpyInstance;
  let initErrorsListenerSpy: jest.SpyInstance;
  let initAgeSubjectSpy: jest.SpyInstance;
  let initPasswordSubjectSpy: jest.SpyInstance;
  let initUsernameSubjectSpy: jest.SpyInstance;

  beforeEach(async(() => {
    const storeMock = jest.fn();

    const facadeMock = jest.fn();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, SharedModule],
      declarations: [PageOneComponent],
      providers: [
        {
          provide: CONNECTION_PATH,
          useValue: 'base-path',
        },
        {
          provide: Store,
          useValue: storeMock,
        },
        {
          provide: ConnectionFacade,
          useValue: facadeMock,
        },
      ],
    }).compileComponents();
  }));

  // initialize components and services
  beforeEach(() => {
    jasmine.addMatchers(speculoosMatchers);
    tester = new PageOneComponentTester();
    fixture = tester.fixture;
    component = tester.componentInstance;
    connectionService = TestBed.get(ConnectionService);

    // spies
    calculateSpy = jest.spyOn<ConnectionService, 'calculate'>(connectionService, 'calculate');
    // the use of the "any" type is to avoid typescript warning/error due to private methods
    initFormSpy = jest.spyOn<any, 'initForm'>(component, 'initForm');
    initSubjectsSpy = jest.spyOn<any, 'initSubjects'>(component, 'initSubjects');
    ngOnInitSpy = jest.spyOn<PageOneComponent, 'ngOnInit'>(component, 'ngOnInit');
    initFormControlsSpy = jest.spyOn<any, 'initFormControls'>(component, 'initFormControls');
    buildValidationErrorsSpy = jest.spyOn<any, 'buildValidationErrors'>(component, 'buildValidationErrors');
    initErrorsListenerSpy = jest.spyOn<PageOneComponent, 'initErrorsListener'>(component, 'initErrorsListener');
    initAgeSubjectSpy = jest.spyOn<PageOneComponent, 'initAgeSubject'>(component, 'initAgeSubject');
    initPasswordSubjectSpy = jest.spyOn<PageOneComponent, 'initPasswordSubject'>(component, 'initPasswordSubject');
    initUsernameSubjectSpy = jest.spyOn<PageOneComponent, 'initUsernameSubject'>(component, 'initUsernameSubject');
    tester.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('component initialization', () => {
    test('should call the intialization methods', () => {
      expect(ngOnInitSpy).toHaveBeenCalledTimes(1);
      expect(calculateSpy).toHaveBeenCalledTimes(1);
      expect(initFormSpy).toHaveBeenCalledTimes(1);
      expect(initSubjectsSpy).toHaveBeenCalledTimes(1);
    });

    test('should call the form intialization sub-methods', () => {
      expect(initFormControlsSpy).toHaveBeenCalledTimes(1);
      expect(buildValidationErrorsSpy).toHaveBeenCalledTimes(1);
      expect(initErrorsListenerSpy).toHaveBeenCalledTimes(1);
    });

    test('should call the subjects intialization sub-methods', () => {
      expect(initAgeSubjectSpy).toHaveBeenCalledTimes(1);
      expect(initPasswordSubjectSpy).toHaveBeenCalledTimes(1);
      expect(initUsernameSubjectSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#initFormControls', () => {
    test('should initialize the username form control', () => {
      expect(component.username).not.toBeNull();
      expect(component.username.value).toEqual(null);
    });

    test('should initialize the password form control', () => {
      expect(component.password).not.toBeNull();
      expect(component.password.value).toEqual(null);
    });

    test('should initialize the age form control', () => {
      expect(component.age).not.toBeNull();
      expect(component.age.value).toEqual(null);
    });
  });

  describe('#buildValidationErrors', () => {
    test('should build validationErrorMessages', async(() => {
      expect(component.validationErrorMessages).toMatchSnapshot();
    }));
  });

  describe('#initErrorsListener', () => {
    test('should call FormErrorsUtil.aggregateErrorsMessages', () => {
      FormErrorsUtil.aggregateErrorsMessages = jest.fn().mockReturnValue(of({}));
      component.form.updateValueAndValidity();
      expect(FormErrorsUtil.aggregateErrorsMessages).toHaveBeenNthCalledWith(1, component.form, component.validationErrorMessages);
    });
  });

  describe('#onChangeUsername', () => {
    test('should be called on username change', () => {
      const onChangeUsernameSpy: jest.SpyInstance = jest.spyOn<PageOneComponent, 'onChangeUsername'>(component, 'onChangeUsername');
      tester.getUsernameInput().fillWith('username');
      expect(onChangeUsernameSpy).toBeCalledTimes(1);
      expect(component.isFormSubmittedSuccessfully).toEqual(false);
    });

    test('should call usernameSubject.next when valid username', () => {
      const username = `username${component.usernameContent}`;
      const usernameSubjectNextSpy: jest.SpyInstance = jest.spyOn<Subject<string>, 'next'>(component['usernameSubject'], 'next');
      component.username.setValue(username);
      component.username.updateValueAndValidity();
      component.onChangeUsername();
      expect(component.username.valid).toEqual(true);
      expect(usernameSubjectNextSpy).toHaveBeenNthCalledWith(1, username);
    });

    test('should not call usernameSubject.next when unvalid username', () => {
      const username = null;
      const usernameSubjectNextSpy: jest.SpyInstance = jest.spyOn<Subject<string>, 'next'>(component['usernameSubject'], 'next');
      component.username.setValue(username);
      component.onChangeUsername();
      expect(component.username.valid).toEqual(false);
      expect(usernameSubjectNextSpy).toBeCalledTimes(0);
    });
  });

  describe('#ngOnDestroy', () => {
    test('should call the unsubscribe on subscriptions', () => {
      const unsubscribeSpy = jest.spyOn<Subscription, 'unsubscribe'>(component['subscriptions'], 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#onSubmit', () => {
    test('should set isFormSubmittedSuccessfully to false if the form is not valid', () => {
      component.onSubmit();
      expect(component.isFormSubmittedSuccessfully).toEqual(false);
    });

    test('should set isFormSubmittedSuccessfully to true if the form is valid', () => {
      component.form.patchValue({
        username: `username${component.usernameContent}`,
        password: `${component.pwdSuffix}mypassword`,
        age: 15,
      });
      component.form.updateValueAndValidity();
      component.onSubmit();
      expect(component.isFormSubmittedSuccessfully).toEqual(true);
    });
  });

  describe('View', () => {
    test('should call #onSubmit on submit-button click', () => {
      const onSubmitSpy = jest.spyOn<PageOneComponent, 'onSubmit'>(component, 'onSubmit');
      const submitBtn: TestButton = tester.getSubmitBtn();
      submitBtn.click();
      expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * TODO : complete tests
   */
});
