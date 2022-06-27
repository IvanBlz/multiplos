import { TestBed } from '@angular/core/testing';

import { MultiplosService } from './multiplos.service.ts.service';

describe('MultiplosService', () => {
  let service: MultiplosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiplosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
