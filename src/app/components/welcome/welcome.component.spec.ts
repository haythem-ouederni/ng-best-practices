import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import * as TRANSLATIONS_EN from '@i18n/app/en.json';
import {Store} from '@ngxs/store';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {WelcomeComponent} from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    const storeMock = jest.fn();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateTestingModule.withTranslations('fr', TRANSLATIONS_EN)],
      declarations: [WelcomeComponent],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
