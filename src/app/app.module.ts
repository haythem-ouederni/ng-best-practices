import {CoreModule, InitializeCurrentLanguage, LanguageState, LanguageUtilsService} from '@abpe/core';
import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsModule, Store} from '@ngxs/store';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components';
import {WelcomeComponent} from './components/welcome/welcome.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgxsModule.forRoot([], {developmentMode: !environment.production}),
    NgxsLoggerPluginModule.forRoot({disabled: environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    NgxsRouterPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        // if you want to include only one json file for internationalization
        // you can use LanguageUtilsService.httpLoaderFactory method :
        // exmaple : LanguageUtilsService.httpLoaderFactory('app')
        useFactory: LanguageUtilsService.multiHttpLoaderFactory(['app', 'common']),
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translationService: TranslateService, private store: Store) {
    // we dispatch an action to insitalize the language state
    this.store.dispatch(new InitializeCurrentLanguage());
    const defaultLanguage: string = this.store.selectSnapshot(LanguageState.defaultLanguage);
    this.translationService.setDefaultLang(defaultLanguage);
    this.store.select(LanguageState.currentLanguage).subscribe((currentLanguage: string) => {
      this.translationService.use(currentLanguage);
    });
  }
}
