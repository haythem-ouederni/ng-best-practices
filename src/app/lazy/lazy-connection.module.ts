import {NgModule} from '@angular/core';
import {ConnectionModule} from '@connection/lib/modules';
import {environment} from '@root/environments/environment';

@NgModule({
  imports: [ConnectionModule.forRoot(environment.connection)],
  exports: [ConnectionModule],
})
export class LazyConnectionModule {}
