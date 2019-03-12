import {TestBed} from '@angular/core/testing';

import {ConnectionService} from './';

describe('ConnectionService', () => {
  let service: ConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    service = TestBed.get(ConnectionService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#calculate', () => {
    test(`should return testing`, () => {
      expect(service.calculate()).toEqual(service.calculated);
    });
  });
});
