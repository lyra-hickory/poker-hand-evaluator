import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardForm } from './card-form';
import {Card} from '../../interfaces/handOfCards';
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
    })
  });
});
