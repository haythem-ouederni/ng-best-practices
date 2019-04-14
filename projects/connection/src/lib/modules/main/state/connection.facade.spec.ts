import {async, TestBed} from '@angular/core/testing';
import {Navigate} from '@ngxs/router-plugin';
import {Store} from '@ngxs/store';
import {ROUTES_PATHS} from '../connection.constant';
import {CONNECTION_PATH} from '../services';
import {UpdateAge, UpdatePassword, UpdateUsername} from './connection.action';
import {ConnectionFacade} from './connection.facade';

describe('ConnectionFacade', () => {
  let connectionFacade: ConnectionFacade;
  let store: Store;

  const connectionPath = 'connection';

  beforeEach(async(() => {
    // we mock the store => no need to inject the Ngxs module
    const storeMock = jest.fn(() => ({
      dispatch: jest.fn(),
    }))();

    TestBed.configureTestingModule({
      providers: [{provide: CONNECTION_PATH, useValue: connectionPath}, {provide: Store, useValue: storeMock}, ConnectionFacade],
    });
  }));

  beforeEach(async(() => {
    connectionFacade = TestBed.get(ConnectionFacade);
    store = TestBed.get(Store);
  }));

  test('should create', () => {
    expect(connectionFacade).toBeTruthy();
  });

  describe('State update', () => {
    describe('updateUsername', () => {
      test('should dispatch UpdateUsername', () => {
        const username = 'username';
        connectionFacade.updateUsername(username);
        expect(store.dispatch).toBeCalledTimes(1);
        expect(store.dispatch).toBeCalledWith(new UpdateUsername(username));
      });
    });

    describe('updatePassword', () => {
      test('should dispatch UpdatePassword', () => {
        const password = 'password';
        connectionFacade.updatePassword(password);
        expect(store.dispatch).toBeCalledTimes(1);
        expect(store.dispatch).toBeCalledWith(new UpdatePassword(password));
      });
    });

    describe('updateAge', () => {
      test('should dispatch UpdateAge', () => {
        const age = 13;
        connectionFacade.updateAge(age);
        expect(store.dispatch).toBeCalledTimes(1);
        expect(store.dispatch).toBeCalledWith(new UpdateAge(age));
      });
    });
  });

  describe('Navigation', () => {
    describe('goToPageOne', () => {
      test('should dispatch Navigate with page one path', () => {
        connectionFacade.goToPageOne();
        expect(store.dispatch).toBeCalledTimes(1);
        expect(store.dispatch).toBeCalledWith(new Navigate([connectionPath, ROUTES_PATHS.pageOne]));
      });
    });

    describe('goToPageTwo', () => {
      test('should dispatch Navigate with page two path', () => {
        connectionFacade.goToPageTwo();
        expect(store.dispatch).toBeCalledTimes(1);
        expect(store.dispatch).toBeCalledWith(new Navigate([connectionPath, ROUTES_PATHS.pageTwo]));
      });
    });
  });
});
