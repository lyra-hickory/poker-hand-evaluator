import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Evaluation} from '../interfaces/evaluation';
import {HandOfCards} from '../interfaces/handOfCards';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluateHandService {
  // TODO: make this configurable outside of changing the code
  // env vars maybe?
  private evaluatorUrl:string = 'http://localhost:8000/eval-hand/';

  constructor(private http: HttpClient) {}

  // Do we maybe add some validation here?
  // I think it would be best if validation is done before submit at component level
  submitHandForEvaluation = (hand: HandOfCards):Observable<Evaluation> => {
    return this.http.post<Evaluation>(this.evaluatorUrl, hand.cards);
  }
}
