import { TestBed } from '@angular/core/testing';

import { EvaluateHandService } from './evaluate-hand-service';
import {describe, expect} from 'vitest';
import {HttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {HandOfCards} from '../interfaces/handOfCards';

describe('EvaluateHandService', () => {
  let service: EvaluateHandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(EvaluateHandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('submitHandForEvaluation', () => {
    it('should post cards', () => {
      // Assemble
      const httpSpy = vi.spyOn(TestBed.inject(HttpClient), 'post');
      const handToSubmit:HandOfCards = {cards: []};

      // Act
      service.submitHandForEvaluation(handToSubmit);

      // Assert
      // jasmine.string could be used in place of the exact string... not sure if there's an equivalent for vi
      expect(httpSpy).toHaveBeenCalledWith('http://localhost:8000/eval-hand/', handToSubmit.cards);
    });
  });
});
