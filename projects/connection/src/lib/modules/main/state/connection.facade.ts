import {Inject, Injectable} from '@angular/core';
import {Navigate} from '@ngxs/router-plugin';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ROUTES_PATHS} from '../connection.constant';
import {CONNECTION_PATH} from '../services/token';
import {UpdateAge, UpdatePassword, UpdateUsername} from './connection.action';
import {ConnectionState, ConnectionStateModel} from './connection.state';

@Injectable({
  providedIn: 'root',
})
export class ConnectionFacade {
  constructor(private store: Store, @Inject(CONNECTION_PATH) private connectionPath: string) {}

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Selects ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  @Select(ConnectionState.username) username$: Observable<string>;
  @Select(ConnectionState.password) password$: Observable<string>;
  @Select(ConnectionState.age) age$: Observable<number>;
  @Select(ConnectionState.userInformation) userInformation$: Observable<ConnectionStateModel>;

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Services ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// State update ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  updateUsername(username: string) {
    this.store.dispatch(new UpdateUsername(username));
  }

  updatePassword(password: string) {
    this.store.dispatch(new UpdatePassword(password));
  }

  updateAge(age: number) {
    this.store.dispatch(new UpdateAge(age));
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Navigation ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  goToPageOne() {
    this.store.dispatch(new Navigate([this.connectionPath, ROUTES_PATHS.pageOne]));
  }

  goToPageTwo() {
    this.store.dispatch(new Navigate([this.connectionPath, ROUTES_PATHS.pageTwo]));
  }
}
