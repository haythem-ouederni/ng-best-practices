import {Component, Inject, OnInit} from '@angular/core';
import {ROUTES_PATHS} from '../../connection.constant';
import {CONNECTION_PATH} from '../../services/token';
import {Observable} from 'rxjs';
import {ConnectionStateModel, ConnectionFacade} from '../../state';

@Component({
  selector: 'cnx-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss'],
})
export class PageTwoComponent implements OnInit {
  username$: Observable<string>;
  password$: Observable<string>;
  age$: Observable<number>;
  userInformation$: Observable<ConnectionStateModel>;

  constructor(private facade: ConnectionFacade) {}

  ngOnInit() {
    this.username$ = this.facade.username$;
    this.password$ = this.facade.password$;
    this.age$ = this.facade.age$;
    this.userInformation$ = this.facade.userInformation$;
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Navigation ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  goToPageOne() {
    this.facade.goToPageOne();
  }
}
