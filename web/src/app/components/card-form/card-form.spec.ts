import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardForm } from './card-form';
import {Card, HandOfCards} from '../../interfaces/handOfCards';
import {EvaluateHandService} from '../../services/evaluate-hand-service';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('CardForm', () => {
  let component: CardForm;
  let fixture: ComponentFixture<CardForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardForm],
      providers: [provideHttpClientTesting()],
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
    const cardToAdd:Card = {
      value: 'king',
      suit: 'd'
    };
    let button:any;

    beforeEach(() => {
      component.inputCard.set({...cardToAdd});
      button = fixture.nativeElement.querySelector('#add-card-to-hand-button');
    })

    it('should add a card to the hand when button is clicked', () => {
      // assemble
      const addCardToHandSpy = vi.spyOn(component, 'addCardToHand');

      // act
      button.click();

      // assert
      expect(addCardToHandSpy).toHaveBeenCalledOnce();
      expect(component.handToEval().cards.length).toBe(1);
      expect(component.handToEval().cards[0]).toEqual(cardToAdd);
      expect(component.hasFullHand()).toBe(false);
    });

    it('should update hasFullHand to true when we add 5 cards and disable add button', () => {
      // assemble
      const mockHand:HandOfCards = {cards: [
          {value: 'one', suit: 'c'},    // 1
          {value: 'two', suit: 'd'},    // 2
          {value: 'three', suit: 'h'},  // 3
          {value: 'four', suit: 's'},   // 4
        ]};
      component.handToEval.set(mockHand);
      const addCardToHandSpy = vi.spyOn(component, 'addCardToHand');

      // act
      button.click();

      // assert
      expect(addCardToHandSpy).toHaveBeenCalledOnce();
      expect(component.handToEval().cards.length).toBe(5);
      expect(component.hasFullHand()).toBe(true);
      expect(button.disabled).toBe(false);
      fixture.detectChanges();
      expect(button.disabled).toBe(true);
    });

    it('should not add when there is already 5 cards in hand', () => {
      // Assemble
      const mockHand:HandOfCards = {cards: [
          {value: 'one', suit: 'c'},    // 1
          {value: 'two', suit: 'd'},    // 2
          {value: 'three', suit: 'h'},  // 3
          {value: 'four', suit: 's'},   // 4
          {value: 'five', suit: 'c'},   // 5
        ]};
      component.handToEval.set(mockHand);
      const consoleLogSpy = vi.spyOn(console, 'log');

      // Act
      button.click();

      // Assert
      // TODO: replace with checking form errors
      expect(consoleLogSpy).toBeCalledWith('Hand is already at 5 cards!');
      expect(component.handToEval().cards.length).toBe(5);
      expect(component.handToEval()).toEqual(mockHand);
    });

    it('should not add duplicate cards', () => {
      // Assemble
      const mockHand:HandOfCards = {cards: [
          {...cardToAdd},
        ]};
      component.handToEval.set(mockHand);
      const consoleLogSpy = vi.spyOn(console, 'log');

      // Act
      button.click();

      // Assert
      // TODO: replace with checking form errors
      expect(consoleLogSpy).toBeCalledWith('You have already added the King of Diamonds');
      expect(component.handToEval().cards.length).toBe(1);
      expect(component.handToEval()).toEqual(mockHand);
    });
  });

  describe('submitHand', () => {
    it('should submit', () => {
      // Assemble
      const evaluateSubmitSpy = vi.spyOn(TestBed.inject(EvaluateHandService), 'submitHandForEvaluation');
      const submitHandSpy = vi.spyOn(component, 'submitHand');
      const mockHand:HandOfCards = {cards: [
          {value: 'one', suit: 'c'},    // 1
          {value: 'two', suit: 'd'},    // 2
          {value: 'three', suit: 'h'},  // 3
          {value: 'four', suit: 's'},   // 4
          {value: 'five', suit: 'c'},   // 5
        ]};
      component.handToEval.set(mockHand);
      component.hasFullHand.set(true);
      const button = fixture.nativeElement.querySelector('#submit-hand-button');

      // Act
      fixture.detectChanges();  // detect changes before we click
      button.click();

      // Assert
      expect(evaluateSubmitSpy).toHaveBeenCalledWith(component.handToEval());
      expect(submitHandSpy).toHaveBeenCalledOnce();
    });

    it('should not submit when we have too few cards in hand', () => {
      // Assemble
      const evaluateSubmitSpy = vi.spyOn(TestBed.inject(EvaluateHandService), 'submitHandForEvaluation');
      const mockHand:HandOfCards = {cards: [
          {value: 'one', suit: 'c'},    // 1
          {value: 'two', suit: 'd'},    // 2
          {value: 'three', suit: 'h'},  // 3
        ]};
      component.handToEval.set(mockHand);
      const consoleLogSpy = vi.spyOn(console, 'log');

      // Act
      component.submitHand();  // directly calling the fn since the button will be disabled

      // Assert
      expect(evaluateSubmitSpy).not.toHaveBeenCalled();
      expect(consoleLogSpy).toBeCalledWith('5 cards are required to submit');
    });

    it('should not click the button if hasFullHand false', () => {
      // Assemble
      const evaluateSubmitSpy = vi.spyOn(TestBed.inject(EvaluateHandService), 'submitHandForEvaluation');
      const submitHandSpy = vi.spyOn(component, 'submitHand');
      const mockHand:HandOfCards = {cards: [
          {value: 'one', suit: 'c'},    // 1
          {value: 'two', suit: 'd'},    // 2
          {value: 'three', suit: 'h'},  // 3
          {value: 'four', suit: 's'},   // 4
        ]};
      component.handToEval.set(mockHand);
      component.hasFullHand.set(false);  // default is false but setting it explicitly regardless
      const button = fixture.nativeElement.querySelector('#submit-hand-button');

      // Act
      fixture.detectChanges();  // detect changes before we click
      button.click();

      // Assert
      expect(evaluateSubmitSpy).not.toHaveBeenCalled();
      expect(submitHandSpy).not.toHaveBeenCalled();
      expect(button.disabled).toBe(true);
    });
  });
});
