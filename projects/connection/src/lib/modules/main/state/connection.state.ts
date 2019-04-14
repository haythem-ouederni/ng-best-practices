import {Action, Selector, State, StateContext} from '@ngxs/store';
import {CONNECTION_STATE_NAME} from '../connection.constant';
import {UpdateAge, UpdatePassword, UpdateUsername} from './connection.action';

export interface ConnectionStateModel {
  username: string;
  password: string;
  age: number;
}

const DEFAULT_CONNECTION_STATE_MODEL: ConnectionStateModel = {
  username: null,
  password: null,
  age: null,
};

@State<ConnectionStateModel>({
  name: CONNECTION_STATE_NAME,
  defaults: DEFAULT_CONNECTION_STATE_MODEL,
})
export class ConnectionState {
  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Selectors ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  @Selector()
  static username(state: ConnectionStateModel): string {
    return state.username;
  }

  @Selector()
  static password(state: ConnectionStateModel): string {
    return state.password;
  }

  @Selector()
  static age(state: ConnectionStateModel): number {
    return state.age;
  }

  @Selector()
  static userInformation(state: ConnectionStateModel): ConnectionStateModel {
    return state;
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Actions ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// User information ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  @Action(UpdateUsername)
  updateUsername({patchState}: StateContext<ConnectionStateModel>, action: UpdateUsername) {
    patchState({username: action.username});
  }

  @Action(UpdatePassword)
  updatePassword({patchState}: StateContext<ConnectionStateModel>, action: UpdatePassword) {
    patchState({password: action.password});
  }

  @Action(UpdateAge)
  updateAge({patchState}: StateContext<ConnectionStateModel>, action: UpdateAge) {
    patchState({age: action.age});
  }
}
