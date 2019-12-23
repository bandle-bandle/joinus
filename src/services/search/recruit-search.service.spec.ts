import { TestBed } from '@angular/core/testing';

import { RecruitSearchService } from './recruit-search.service';

describe('RecruitSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecruitSearchService = TestBed.get(RecruitSearchService);
    expect(service).toBeTruthy();
  });
});
