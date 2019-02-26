import {Component} from '@angular/core';
import {ROUTES_PATHS} from '@connection/lib/modules';
import {environment} from '@root/environments/environment';

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
