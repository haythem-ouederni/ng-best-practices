import {ConnectionLibEnv} from '@abpe/general/environments/env.connection';
import {SharedModule} from '@abpe/shared';
import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {ConnectionRoutingModule} from './connection-routing.module';
import {PageOneComponent} from './pages';
import {PageTwoComponent} from './pages/page-two/page-two.component';
import {CONNECTION_PATH} from './services/token';
import {ConnectionFacade, ConnectionState} from './state';

@NgModule({
  declarations: [PageOneComponent, PageTwoComponent],
  imports: [ConnectionRoutingModule, ReactiveFormsModule, CommonModule, SharedModule, NgxsModule.forFeature([ConnectionState])],
  providers: [ConnectionFacade],
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
