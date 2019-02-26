import {Component, Inject, OnInit} from '@angular/core';
import {ROUTES_PATHS} from '../../connection.constant';
import {ConnectionService} from '../../services';
import {CONNECTION_PATH} from '../../services/token';

@Component({
  selector: 'cnx-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss'],
})
export class PageOneComponent implements OnInit {
  linkToPageTwo = `/${this.connectionPath}/${ROUTES_PATHS.pageTwo}`;

  display: string;

  constructor(private connectionService: ConnectionService, @Inject(CONNECTION_PATH) private connectionPath: string) {}

  ngOnInit() {
    this.display = this.connectionService.calcultate();
  }
}
