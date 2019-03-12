import {ROUTES_PATHS} from '@abpe/connection/lib/modules';
import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  linkToPageOne = `/${environment.connection.basePath}/${ROUTES_PATHS.pageOne}`;

  title = 'Angular Best Practices Example';

  env = environment.production;
}
