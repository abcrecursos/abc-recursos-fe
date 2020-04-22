import { TestBed } from '@angular/core/testing';

import { SupppliesService } from './suppplies.service';

describe('SupppliesService', () => {
  let service: SupppliesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupppliesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
