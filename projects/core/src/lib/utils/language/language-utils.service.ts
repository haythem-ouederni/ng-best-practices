import {HttpClient} from '@angular/common/http';
import {isNullOrUndefined} from 'util';
import {I18N_BASE_URL} from '../../core.constant';
import {ITranslationResource, MultiTranslateHttpLoader} from './multi-translate-http-loader';

export class LanguageUtilsService {
  /**
   * Calculates the path of the json file to be used for internationalization and returns the adequate
   * Http Loader.
   * @param libName :
   *  the library's name we want to have internationalization for. Matches a name of repo under general/assets/i18n.
   *  Example : libName = 'connection'.
   * @returns :
   *  A function to define the Http Loader to be used for internationalization to get the json files containing different texts.
   */
  static httpLoaderFactory(libName?: string): (http: HttpClient) => MultiTranslateHttpLoader {
    // No check on libName is done because we can't throw an exception due
    // to the signature of the loader and that we won't use a common internationalization
    // json file on the other hand
    return this.multiHttpLoaderFactory([libName]);
  }

  /**
   * Calculates the path of the different json files to be used for internationalization and returns the adequate
   * Http Loader.
   * @param listLibNames :
   *  A list of the libraries names we want to have internationalization for.
   *  Each elements matches a name of repo under general/assets/i18n.
   *  Example : listLibName = ['connection', 'profile'].
   * @returns :
   *  A function to define the Http Loader to be used for internationalization to get the json files containing different texts.
   */
  static multiHttpLoaderFactory(listLibNames?: string[]): (http: HttpClient) => MultiTranslateHttpLoader {
    // No check on listLibNames is done because we can't throw an exception due
    // to the signature of the loader and that we won't use a common internationalization
    // json file on the other hand
    const listTranslationResources: ITranslationResource[] = [];
    if (!isNullOrUndefined(listLibNames)) {
      listLibNames.map((libName: string) => {
        listTranslationResources.push({
          prefix: `${I18N_BASE_URL}${libName}/`,
          suffix: '.json',
        });
      });
    }
    return (http: HttpClient): MultiTranslateHttpLoader => {
      return new MultiTranslateHttpLoader(http, listTranslationResources);
    };
  }

  /**
   * This method return the default navigator language
   */
  static getBrowserLanguage(): string {
    return navigator.language || navigator['userLanguage'];
  }
}
