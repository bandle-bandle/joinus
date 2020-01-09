import { TestBed } from '@angular/core/testing';

import { TalkroomService } from './talkroom.service';

describe('TalkroomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TalkroomService = TestBed.get(TalkroomService);
    expect(service).toBeTruthy();
  });
});
