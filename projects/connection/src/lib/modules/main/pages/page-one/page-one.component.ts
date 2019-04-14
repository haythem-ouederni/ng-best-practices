import {CommonValidationMessagesService, FormErrorsUtil, FormGroupFinalErrorsMessages, FormGroupValidationErrorsMessages} from '@abpe/core';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {merge, Observable, of, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, mergeMap} from 'rxjs/operators';
import {
  DEBOUNCE_TIME,
  INTEGER_PATTERN,
  MAX_POSSIBLE_AGE,
  MIN_POSSIBLE_AGE,
  PWD_MIN_LENGTH,
  ROUTES_PATHS,
  USERNAME_PATTERN,
} from '../../connection.constant';
import {ConnectionService, CONNECTION_PATH} from '../../services';
import {ConnectionFacade} from '../../state';
import {PasswordValidators, PasswordValidatorsMessages, UsernameValidatorsMessages} from '../../validators';
import {UsernameValidators} from '../../validators/username/username-validators';

@Component({
  selector: 'cnx-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss'],
})
export class PageOneComponent implements OnInit, OnDestroy {
  display: string;

  // Form information
  form: FormGroup;
  username: FormControl;
  password: FormControl;
  age: FormControl;

  // contains the error messages related to the form inputs
  validationErrorMessages: FormGroupValidationErrorsMessages;

  // listeners over some form values that will avoid
  // to trigger action after each key strike
  private usernameSubject = new Subject<string>();
  private passwordSubject = new Subject<string>();
  private ageSubject = new Subject<number>();

  // boolean to indicate whether the form was sumitted sucessfully
  isFormSubmittedSuccessfully = false;

  // object containing the different form errors
  formErrors: {[key: string]: string};

  // password suffix for validation
  pwdSuffix = 'py';

  // username string to be contained for validation
  usernameContent = 'ngx';

  // we add all the subscriptions here to unsubscribe them at once
  // when destroying the component
  private subscriptions: Subscription = new Subscription();

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Constructor ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  constructor(
    private connectionService: ConnectionService,
    private formBuilder: FormBuilder,
    private commonValidationMessages: CommonValidationMessagesService,
    private facade: ConnectionFacade
  ) {}

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Component hooks ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  ngOnInit(): void {
    // just to demonstrate the use of an Injectable service
    this.display = this.connectionService.calculate();

    // initialize the form
    this.initForm();

    // we initialize the subjects
    this.initSubjects();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Form initialisation ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  private initFormControls(): void {
    this.username = this.formBuilder.control(null, [
      Validators.required,
      Validators.pattern(USERNAME_PATTERN),
      UsernameValidators.containsValidator(this.usernameContent),
    ]);

    this.password = this.formBuilder.control(null, [
      Validators.required,
      Validators.minLength(PWD_MIN_LENGTH),
      PasswordValidators.beginWithValidator(this.pwdSuffix),
    ]);

    this.age = this.formBuilder.control(null, [
      Validators.required,
      Validators.min(MIN_POSSIBLE_AGE),
      Validators.max(MAX_POSSIBLE_AGE),
      Validators.pattern(INTEGER_PATTERN),
    ]);
  }

  /**
   * Building all the needed validation messages for each form control
   * that needs it
   */
  private buildValidationErrors(): void {
    this.validationErrorMessages = {
      username: {
        ...this.commonValidationMessages.validationMessages.required,
        ...this.commonValidationMessages.validationMessages.invalid,
        contains: UsernameValidatorsMessages.contains.contains({
          value: this.username ? this.username.value : null,
          content: this.usernameContent,
        }),
      },
      password: {
        ...this.commonValidationMessages.validationMessages.required,
        minlength: this.commonValidationMessages.validationMessages.length.minlength.minlength({requiredLength: PWD_MIN_LENGTH}),
        ...PasswordValidatorsMessages.beginsWith,
      },
      age: {
        ...this.commonValidationMessages.validationMessages.required,
        ...this.commonValidationMessages.validationMessages.numbers.integer.pattern,
        ...this.commonValidationMessages.validationMessages.numbers.min,
        ...this.commonValidationMessages.validationMessages.numbers.max,
      },
    };
  }

  /**
   * Initializes the errors listener
   */
  initErrorsListener(): void {
    const errorsSubscription = merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(
        mergeMap(() => of(FormErrorsUtil.aggregateErrorsMessages(this.form, this.validationErrorMessages))),
        mergeMap((errorMessages: FormGroupFinalErrorsMessages) => {
          // we process the error message to return, for each formcontrol,
          // only a string containing the first error message
          const newErrorMessages = {};
          Object.keys(errorMessages).map((key: string) => {
            newErrorMessages[key] = errorMessages[key][0];
          });
          return of(newErrorMessages);
        })
      )
      .subscribe(formErrors => {
        this.formErrors = formErrors;
      });
    this.subscriptions.add(errorsSubscription);
  }

  private initForm(): void {
    // initialize the validation error messages
    this.buildValidationErrors();

    // initialize the form controls
    this.initFormControls();

    // we initialize the Group from
    this.form = this.formBuilder.group({
      username: this.username,
      password: this.password,
      age: this.age,
    });

    // initialize the errors listener
    this.initErrorsListener();

    // force the value update of formErrors => by being into the subscribe
    this.form.updateValueAndValidity();
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Input changes ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  onChangeUsername(): void {
    // we reset isFormSubmittedSuccessfully at any change
    this.isFormSubmittedSuccessfully = false;
    if (this.username.valid) {
      const newUsernameValue = this.username.value;
      this.usernameSubject.next(newUsernameValue);
    }
  }

  onChangePassword(): void {
    // we reset isFormSubmittedSuccessfully at any change
    this.isFormSubmittedSuccessfully = false;
    if (this.password.valid) {
      const newPasswordValue = this.password.value;
      this.passwordSubject.next(newPasswordValue);
    }
  }

  onChangeAge(): void {
    // we reset isFormSubmittedSuccessfully at any change
    this.isFormSubmittedSuccessfully = false;
    if (this.age.valid) {
      const newAgeValue = this.age.value;
      this.ageSubject.next(newAgeValue);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Initialize subjects ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  commonInitSubject(subject: Subject<any>): Observable<number | string> {
    return subject.pipe(
      // wait 400ms after each keystroke before considering the term
      debounceTime(DEBOUNCE_TIME),
      // ignore new term if same as previous term
      distinctUntilChanged()
    );
  }

  /**
   * Initialize the different subjects for every input
   */
  private initSubjects(): void {
    this.initUsernameSubject();
    this.initPasswordSubject();
    this.initAgeSubject();
  }

  initAgeSubject(): void {
    const subscription = this.commonInitSubject(this.ageSubject).subscribe((age: number) => {
      // update the state
      this.facade.updateAge(age);
    });

    this.subscriptions.add(subscription);
  }
  initPasswordSubject(): void {
    const subscription = this.commonInitSubject(this.passwordSubject).subscribe((password: string) => {
      // update the state
      this.facade.updatePassword(password);
    });

    this.subscriptions.add(subscription);
  }
  initUsernameSubject(): void {
    const subscription = this.commonInitSubject(this.usernameSubject).subscribe((username: string) => {
      // update the state
      this.facade.updateUsername(username);
    });

    this.subscriptions.add(subscription);
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Form submission ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  onSubmit(): void {
    if (this.form.valid) {
      this.isFormSubmittedSuccessfully = true;
    } else {
      this.isFormSubmittedSuccessfully = false;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Navigation ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  goToPageTwo() {
    this.facade.goToPageTwo();
  }
}
