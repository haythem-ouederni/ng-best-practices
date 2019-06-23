import {HttpClient} from '@angular/common/http';
import {TranslateLoader} from '@ngx-translate/core';
import * as merge from 'deepmerge';
import {forkJoin, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export interface ITranslationResource {
  prefix: string;
  suffix: string;
}

export const TRANSLATION_FILE_NOT_FOUND = 'Could not find translation file:';

/**
 * @credits : https://github.com/denniske/ngx-translate-multi-http-loader
 */
export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, private resources: ITranslationResource[]) {}

  public getTranslation(lang: string): Observable<any> {
    const requests = this.resources.map(resource => {
      const path = resource.prefix + lang + resource.suffix;
      return this.http.get(path).pipe(
        catchError(() => {
          return throwError(`${TRANSLATION_FILE_NOT_FOUND} : ${path}`);
        })
      );
    });
    return forkJoin(requests).pipe(map(response => merge.all(response)));
  }
}
