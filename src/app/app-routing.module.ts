import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '@root/environments/environment';
import {WelcomeComponent} from './components';

const routes: Routes = [
  {
    path: environment.connection.basePath,
    loadChildren: './lazy/lazy-connection.module#LazyConnectionModule',
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
