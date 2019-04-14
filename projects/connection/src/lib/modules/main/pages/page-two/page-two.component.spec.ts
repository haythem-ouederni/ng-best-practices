import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngxs/store';
import {CONNECTION_PATH} from '../../services/token';
import {ConnectionFacade} from '../../state';
import {PageTwoComponent} from './page-two.component';

describe('PageTwoComponent', () => {
  let component: PageTwoComponent;
  let fixture: ComponentFixture<PageTwoComponent>;

  beforeEach(async(() => {
    const storeMock = jest.fn();

    const facadeMock = jest.fn();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PageTwoComponent],
      providers: [
        {
          provide: CONNECTION_PATH,
          useValue: '',
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

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTwoComponent);
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
