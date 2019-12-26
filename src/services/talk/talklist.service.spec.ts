import { TestBed } from '@angular/core/testing';

import { TalklistService } from './talklist.service';

describe('TalklistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TalklistService = TestBed.get(TalklistService);
    expect(service).toBeTruthy();
  });
});
