import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngxs/store';
import {AppComponent} from './app.component';
import {ListLanguages} from '@abpe/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    const storeMock = jest.fn(() => ({
      selectSnapshot: jest.fn().mockReturnValue(ListLanguages.EN),
    }))();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{provide: Store, useValue: storeMock}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  test('should be created', () => {
    expect(component).toBeTruthy();
  });

  test('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
