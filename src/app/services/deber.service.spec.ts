import { TestBed } from '@angular/core/testing';

import { DeberService } from './deber.service';

describe('DeberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeberService = TestBed.get(DeberService);
    expect(service).toBeTruthy();
  });
});
