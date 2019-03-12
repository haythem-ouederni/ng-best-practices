import {ConnectionModule} from '@abpe/connection/lib/modules';
import {NgModule} from '@angular/core';
import {environment} from '../../environments/environment';

@NgModule({
  imports: [ConnectionModule.forRoot(environment.connection)],
  exports: [ConnectionModule],
})
export class LazyConnectionModule {}
