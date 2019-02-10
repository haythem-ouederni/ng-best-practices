import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConnectionComponent } from '@connection/lib/modules/main/pages';

@NgModule({
  declarations: [ConnectionComponent],
  imports: [
  ],
  exports: [ConnectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConnectionModule { }
