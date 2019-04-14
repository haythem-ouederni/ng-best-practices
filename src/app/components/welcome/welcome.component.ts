import {ROUTES_PATHS} from '@abpe/connection/lib/modules';
import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Navigate} from '@ngxs/router-plugin';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  title = 'Angular Best Practices Example';

  env = environment.production;

  constructor(private store: Store) {}

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Navigayion ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  goToPageOne() {
    this.store.dispatch(new Navigate([environment.connection.basePath, ROUTES_PATHS.pageOne]));
  }
}
