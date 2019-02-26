import {Component, Inject, OnInit} from '@angular/core';
import {ROUTES_PATHS} from '../../connection.constant';
import {CONNECTION_PATH} from '../../services/token';

@Component({
  selector: 'cnx-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss'],
})
export class PageTwoComponent implements OnInit {
  linkToPageOne = `/${this.connectionPath}/${ROUTES_PATHS.pageOne}`;

  constructor(@Inject(CONNECTION_PATH) private connectionPath: string) {}

  ngOnInit() {}
}
