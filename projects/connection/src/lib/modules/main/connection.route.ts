import {Routes} from '@angular/router';
import {ROUTES_PATHS} from './connection.constant';
import {PageOneComponent, PageTwoComponent} from './pages';

export const CONNECTION_ROUTES: Routes = [
  {
    path: ROUTES_PATHS.pageOne,
    component: PageOneComponent,
  },
  {
    path: ROUTES_PATHS.pageTwo,
    component: PageTwoComponent,
  },
];
