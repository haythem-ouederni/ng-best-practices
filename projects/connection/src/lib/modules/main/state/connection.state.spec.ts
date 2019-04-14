import {async, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {CONNECTION_STATE_NAME} from '../connection.constant';
import {UpdateAge, UpdatePassword, UpdateUsername} from './connection.action';
import {ConnectionState, ConnectionStateModel} from './connection.state';

const DEFAULT_CONNECTION_STATE_MODEL_1: ConnectionStateModel = {
  username: 'my-username',
  password: 'my-password',
  age: 13,
};

describe('ConnectionState', () => {
  let store: Store;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ConnectionState])],
    });
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    // spies
    dispatchSpy = jest.spyOn<Store, 'dispatch'>(store, 'dispatch');
  });

  describe('Selectors', () => {
    describe('#username', () => {
      test('should return right username', () => {
        const username = ConnectionState.username(DEFAULT_CONNECTION_STATE_MODEL_1);
        expect(username).toEqual(DEFAULT_CONNECTION_STATE_MODEL_1.username);
      });
    });

    describe('#password', () => {
      test('should return right password', () => {
        const password = ConnectionState.password(DEFAULT_CONNECTION_STATE_MODEL_1);
        expect(password).toEqual(DEFAULT_CONNECTION_STATE_MODEL_1.password);
      });
    });

    describe('#age', () => {
      test('should return right username', () => {
        const age = ConnectionState.age(DEFAULT_CONNECTION_STATE_MODEL_1);
        expect(age).toEqual(DEFAULT_CONNECTION_STATE_MODEL_1.age);
      });
    });

    describe('#userInformation', () => {
      test('should return right user information', () => {
        const userInformation = ConnectionState.userInformation(DEFAULT_CONNECTION_STATE_MODEL_1);
        expect(userInformation).toEqual(DEFAULT_CONNECTION_STATE_MODEL_1);
      });
    });
  });

  describe('Actions', () => {
    describe('User information', () => {
      describe('#UpdateUsername', () => {
        test('should update username', async(() => {
          const newUsername = 'new-username';
          store.reset({[CONNECTION_STATE_NAME]: {...DEFAULT_CONNECTION_STATE_MODEL_1}});
          store.dispatch(new UpdateUsername(newUsername));
          store
            .selectOnce(state => state[CONNECTION_STATE_NAME])
            .subscribe((state: ConnectionStateModel) => {
              expect(dispatchSpy).toBeCalledTimes(1);
              expect(dispatchSpy).toBeCalledWith({username: newUsername});
              expect(state.username).toEqual(newUsername);
            });
        }));
      });

      describe('#UpdatePassword', () => {
        test('should update password', async(() => {
          const newPassword = 'new-password';
          store.reset({[CONNECTION_STATE_NAME]: {...DEFAULT_CONNECTION_STATE_MODEL_1}});
          store.dispatch(new UpdatePassword(newPassword));
          store
            .selectOnce(state => state[CONNECTION_STATE_NAME])
            .subscribe((state: ConnectionStateModel) => {
              expect(dispatchSpy).toBeCalledTimes(1);
              expect(dispatchSpy).toBeCalledWith({password: newPassword});
              expect(state.password).toEqual(newPassword);
            });
        }));
      });

      describe('#UpdateAge', () => {
        test('should update the age', async(() => {
          const newAge = 35;
          store.reset({[CONNECTION_STATE_NAME]: {...DEFAULT_CONNECTION_STATE_MODEL_1}});
          store.dispatch(new UpdateAge(newAge));
          store
            .selectOnce(state => state[CONNECTION_STATE_NAME])
            .subscribe((state: ConnectionStateModel) => {
              expect(dispatchSpy).toBeCalledTimes(1);
              expect(dispatchSpy).toBeCalledWith({age: newAge});
              expect(state.age).toEqual(newAge);
            });
        }));
      });
    });
  });
});
