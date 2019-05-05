import {LanguageUtilsService} from './language-utils.service';

describe('LanguageUtilsService', () => {
  describe('#httpLoaderFactory', () => {
    test('should return a function', () => {
      const httpLoaderFactory = LanguageUtilsService.httpLoaderFactory();
      expect(httpLoaderFactory).toEqual(jasmine.any(Function));
    });

    test('should call multiHttpLoaderFactory with one parameter', () => {
      const translateDirectory = 'custom-module';
      spyOn(LanguageUtilsService, 'multiHttpLoaderFactory');
      LanguageUtilsService.httpLoaderFactory(translateDirectory);
      expect(LanguageUtilsService.multiHttpLoaderFactory).toHaveBeenNthCalledWith(1, [translateDirectory]);
    });
  });

  describe('#multiHttpLoaderFactory', () => {
    test('should return a function', () => {
      const multiHttpLoaderFactory = LanguageUtilsService.multiHttpLoaderFactory();
      expect(multiHttpLoaderFactory).toEqual(jasmine.any(Function));
    });
  });
});
