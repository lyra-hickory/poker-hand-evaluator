import { TestBed } from '@angular/core/testing';

import { EvaluateHandService } from './evaluate-hand-service';

describe('EvaluateHandService', () => {
  let service: EvaluateHandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluateHandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
