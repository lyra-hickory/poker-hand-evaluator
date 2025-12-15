import {Card} from './handOfCards';

export interface Evaluation {
  playingHand: Card[],
  kickers: Card[],
  rank:string,
}
