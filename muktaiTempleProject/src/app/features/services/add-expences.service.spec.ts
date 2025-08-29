import { TestBed } from '@angular/core/testing';

import { AddExpencesService } from './add-expences.service';

describe('AddExpencesService', () => {
  let service: AddExpencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddExpencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
