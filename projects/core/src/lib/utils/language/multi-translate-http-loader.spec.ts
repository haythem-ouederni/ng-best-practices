import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {ITranslationResource, MultiTranslateHttpLoader, TRANSLATION_FILE_NOT_FOUND} from './multi-translate-http-loader';

describe('MultiTranslateHttpLoader', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const language = 'fr';
  const suffix = '.json';
  const prefixBase = './assets/i18n';

  const translationResource1: ITranslationResource = {
    prefix: prefixBase + 'dir1/',
    suffix,
  };

  const translationResource2: ITranslationResource = {
    prefix: prefixBase + 'dir2/',
    suffix,
  };

  const trasnaltion1 = {
    translation1: {
      test: 'test',
    },
  };

  const trasnaltion2 = {
    translation2: {
      test: 'test',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(() => {
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#getTranslation', () => {
    test('should return a single translation when asking for one file', done => {
      const multiTranslateHttpLoader = new MultiTranslateHttpLoader(httpClient, [translationResource1]);
      multiTranslateHttpLoader.getTranslation(language).subscribe((traduction: any) => {
        expect(traduction).toEqual(trasnaltion1);
        done();
      });

      const request = httpTestingController.expectOne(translationResource1.prefix + language + translationResource1.suffix);

      // Assert that the request is a GET.
      expect(request.request.method).toEqual('GET');

      // send mocked data
      request.flush(trasnaltion1);
    });

    test('should return a multiple translations when asking for mutlpiple files', done => {
      const multiTranslateHttpLoader = new MultiTranslateHttpLoader(httpClient, [translationResource1, translationResource2]);
      multiTranslateHttpLoader.getTranslation(language).subscribe((traductions: any) => {
        expect(traductions).toEqual({...trasnaltion1, ...trasnaltion2});
        done();
      });

      const request1 = httpTestingController.expectOne(translationResource1.prefix + language + translationResource1.suffix);

      // Assert that the request is a GET.
      expect(request1.request.method).toEqual('GET');

      // send mocked data
      request1.flush(trasnaltion1);

      const request2 = httpTestingController.expectOne(translationResource2.prefix + language + translationResource2.suffix);

      // Assert that the request is a GET.
      expect(request2.request.method).toEqual('GET');

      // send mocked data
      request2.flush(trasnaltion2);
    });

    test('should return empty object when file not found', done => {
      const multiTranslateHttpLoader = new MultiTranslateHttpLoader(httpClient, [translationResource1]);
      const path: string = translationResource1.prefix + language + translationResource1.suffix;
      multiTranslateHttpLoader.getTranslation(language).subscribe(
        traductions => {
          expect(true).toEqual(false);
          done();
        },
        error => {
          expect(error).toEqual(`${TRANSLATION_FILE_NOT_FOUND} : ${path}`);
          done();
        }
      );
      const request1 = httpTestingController.expectOne(path);

      // Respond with mock error
      request1.flush('getting files error', {status: 404, statusText: 'Not Found'});
    });
  });
});
