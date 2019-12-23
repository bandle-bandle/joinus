import { TestBed } from '@angular/core/testing';

import { LogonCheckService } from './logon-check.service';

describe('LogonCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogonCheckService = TestBed.get(LogonCheckService);
    expect(service).toBeTruthy();
  });
});
