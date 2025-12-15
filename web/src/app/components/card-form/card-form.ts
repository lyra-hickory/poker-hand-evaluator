import {Component, signal} from '@angular/core';
import {Card, HandOfCards} from '../../interfaces/handOfCards';
import {Field, form} from '@angular/forms/signals';
import {EvaluateHandService} from '../../services/evaluate-hand-service';

@Component({
  selector: 'app-card-form',
  imports: [
    Field
  ],
  templateUrl: './card-form.html',
  styleUrl: './card-form.css',
})
export class CardForm {
  // Hand variables
  handToEval = signal<HandOfCards>({cards: []});
  hasFullHand = signal(false);

  // Form variables
  inputCard = signal<Card>({
    value: 'ace',
    suit: 's',
  });
  cardForm = form(this.inputCard);

  constructor(private evaluateHandService: EvaluateHandService) {}

  addCardToHand = ():void => {
    // We have a limit of 5 cards per hand
    if (this.handToEval().cards.length === 5) {
      // TODO: set error message informing the user
      console.log('Hand is already at 5 cards!')
      return;
    }

    const newCard:Card = {
      value: this.cardForm.value().value(),
      suit: this.cardForm.suit().value(),
    };

    // Check if our new card is already in the hand
    const isUniqueCard:boolean = !!this.handToEval().cards.reduce((c:Card|false, e:Card) => {
      if (!c)
        return false;

      if(c.value === e.value && c.suit === e.suit)
        return false;
      return c;
    }, newCard);

    if(!isUniqueCard) {
      const cardValStr = newCard.value[0].toUpperCase() + String(newCard.value).slice(1);
      const cardSuitStr =
        newCard.suit === 's' ? 'Spades' :
        newCard.suit === 'h' ? 'Hearts' :
        newCard.suit === 'd' ? 'Diamonds' :
        newCard.suit === 'c' ? 'Clubs' :
          'Not a match';
      console.log(`You have already added the ${cardValStr} of ${cardSuitStr}`);
      return;
    }

    this.handToEval().cards.push(newCard);
    if (this.handToEval().cards.length === 5)
      this.hasFullHand.set(true);
    console.log('Successfully added card!')
  }

  submitHand = ():void => {
    if(this.handToEval().cards.length !== 5) {
      console.log('5 cards are required to submit')
      return;
    }

    this.evaluateHandService.submitHandForEvaluation(this.handToEval())
      .subscribe((res) => {
        console.log(res);
      })
  }
}
