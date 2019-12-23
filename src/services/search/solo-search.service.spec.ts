import { TestBed } from '@angular/core/testing';

import { SoloSearchService } from './solo-search.service';

describe('SoloSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoloSearchService = TestBed.get(SoloSearchService);
    expect(service).toBeTruthy();
  });
});
