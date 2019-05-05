import {LanguageState, LanguageUtilsService} from '@abpe/core';
import {ConnectionLibEnv} from '@abpe/general/environments/env.connection';
import {SharedModule} from '@abpe/shared';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgxsModule, Store} from '@ngxs/store';
import {ConnectionRoutingModule} from './connection-routing.module';
import {PageOneComponent} from './pages';
import {PageTwoComponent} from './pages/page-two/page-two.component';
import {CONNECTION_PATH} from './services/token';
import {ConnectionFacade, ConnectionState} from './state';
import {PasswordValidatorsMessagesService, UsernameValidatorsMessagesService} from './validators';

@NgModule({
  declarations: [PageOneComponent, PageTwoComponent],
  imports: [
    ConnectionRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([ConnectionState]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: LanguageUtilsService.multiHttpLoaderFactory(['common', 'connection']),
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  providers: [ConnectionFacade, UsernameValidatorsMessagesService, PasswordValidatorsMessagesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConnectionModule {
  constructor(private translationService: TranslateService, private store: Store) {
    const defaultLanguage: string = this.store.selectSnapshot(LanguageState.defaultLanguage);
    this.translationService.setDefaultLang(defaultLanguage);
    this.store.select(LanguageState.currentLanguage).subscribe((currentLanguage: string) => {
      this.translationService.use(currentLanguage);
    });
  }

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
