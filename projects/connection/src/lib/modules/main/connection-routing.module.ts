import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CONNECTION_ROUTES} from './connection.route';

@NgModule({
  imports: [RouterModule.forChild(CONNECTION_ROUTES)],
  exports: [RouterModule],
})
export class ConnectionRoutingModule {}
