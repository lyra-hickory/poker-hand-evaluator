import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardForm } from './card-form';
import {Card, HandOfCards} from '../../interfaces/handOfCards';
import {expect} from 'vitest';

describe('CardForm', () => {
  let component: CardForm;
  let fixture: ComponentFixture<CardForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addCardToHand', () => {
    it('should add a card to the hand when button is clicked', () => {
      // assemble
      const cardToAdd:Card = {
        value: 'king',
        suit: 'd'
      };
      component.inputCard.set(cardToAdd);

      const button  = fixture.nativeElement.querySelector('#add-card-to-hand-button');
      const addCardToHandSpy = vi.spyOn(component, 'addCardToHand');

      // act
      button.click();

      // assert
      expect(addCardToHandSpy).toHaveBeenCalledOnce();
      expect(component.handToEval().cards.length).toBe(1);
      expect(component.handToEval().cards[0]).toEqual(cardToAdd);
    });

    it('should not add when there is already 5 cards in hand', () => {
      // Assemble
      const cardToAdd:Card = {
        value: 'king',
        suit: 'd'
      };
      component.inputCard.set(cardToAdd);

      const mockHand:HandOfCards = {cards: [
          {value: 'one', suit: 'c'},    // 1
          {value: 'two', suit: 'd'},    // 2
          {value: 'three', suit: 'h'},  // 3
          {value: 'four', suit: 's'},   // 4
          {value: 'five', suit: 'c'},   // 5
        ]};
      component.handToEval.set(mockHand);
      const button  = fixture.nativeElement.querySelector('#add-card-to-hand-button');
      const consoleLogSpy = vi.spyOn(console, 'log');

      // Act
      button.click();

      // Assert
      // TODO: replace with checking form errors
      expect(consoleLogSpy).toBeCalledWith('Hand is already at 5 cards!');
      expect(component.handToEval().cards.length).toBe(5);
      expect(component.handToEval()).toEqual(mockHand);
    });
  });
});
