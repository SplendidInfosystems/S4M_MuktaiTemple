import { TestBed } from '@angular/core/testing';

import { TempleLocationService } from './temple-location.service';

describe('TempleLocationService', () => {
  let service: TempleLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempleLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
