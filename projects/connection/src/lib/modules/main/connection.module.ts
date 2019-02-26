import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';
import {ConnectionLibEnv} from '@general/environments/env.connection';
import {ConnectionRoutingModule} from './connection-routing.module';
import {PageOneComponent} from './pages';
import {PageTwoComponent} from './pages/page-two/page-two.component';
import {CONNECTION_PATH} from './services/token';

@NgModule({
  declarations: [PageOneComponent, PageTwoComponent],
  imports: [ConnectionRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConnectionModule {
  public static forRoot(connectionEnv: ConnectionLibEnv): ModuleWithProviders {
    return {
      ngModule: ConnectionModule,
      providers: [
        {
          provide: CONNECTION_PATH,
          useValue: connectionEnv.basePath,
        },
      ],
    };
  }
}
