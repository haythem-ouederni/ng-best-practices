import {TestBed} from '@angular/core/testing';

import {ConnectionService} from '@connection/lib/modules';

describe('ConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service: ConnectionService = TestBed.get(ConnectionService);
    expect(service).toBeTruthy();
  });
});
