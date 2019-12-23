import { TestBed } from '@angular/core/testing';

import { BandSearchService } from './band-search.service';

describe('BandSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BandSearchService = TestBed.get(BandSearchService);
    expect(service).toBeTruthy();
  });
});
