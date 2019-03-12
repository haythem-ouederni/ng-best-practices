import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import {WelcomeComponent} from './components';

const routes: Routes = [
  {
    path: environment.connection.basePath,
    loadChildren: './lazy-modules/lazy-connection.module#LazyConnectionModule',
  },
  {
    path: '',
    component: WelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
