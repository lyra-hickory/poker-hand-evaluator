import unittest

from ..models.EvalResModel import EvaluateResponse
from ..models.CardModel import Card


from ..evaluate_hand import evaluate_hand


class TestEvaluateHand(unittest.TestCase):

    test_cases = [
        # Royal Flush
        {
            'test': [
                Card(value='ace', suit='h'),
                Card(value='king', suit='h'),
                Card(value='queen', suit='h'),
                Card(value='jack', suit='h'),
                Card(value='ten', suit='h'),
            ],
            'expected': EvaluateResponse(
                playingHand=[
                    'Ace of Hearts',
                    'King of Hearts',
                    'Queen of Hearts',
                    'Jack of Hearts',
                    'Ten of Hearts',
            ],
                kickers=[],
                rank='Royal Flush'),
        },
        # Straight Flush
        {
            'test': [
                Card(value='seven', suit='h'),
                Card(value='six', suit='h'),
                Card(value='five', suit='h'),
                Card(value='four', suit='h'),
                Card(value='three', suit='h'),
            ],
            'expected': EvaluateResponse(
                playingHand=[
                    'Seven of Hearts',
                    'Six of Hearts',
                    'Five of Hearts',
                    'Four of Hearts',
                    'Three of Hearts',
                ],
                kickers=[],
                rank='Straight Flush'),
        },
        # Four of a Type
        {
            'test': [
                Card(value='ace', suit='h'),
                Card(value='ace', suit='c'),
                Card(value='ace', suit='s'),
                Card(value='ace', suit='d'),
                Card(value='ten', suit='h'),
            ],
            'expected': EvaluateResponse(
                playingHand=[
                    'Ace of Hearts',
                    'Ace of Clubs',
                    'Ace of Spades',
                    'Ace of Diamonds',
                ],
                kickers=['Ten of Hearts',],
                rank='Four of a Type'),
        },
        # Full House
        {
            'test': [
                Card(value='two', suit='h'),
                Card(value='two', suit='c'),
                Card(value='two', suit='d'),
                Card(value='three', suit='h'),
                Card(value='three', suit='c'),
            ],
            'expected': EvaluateResponse(
                playingHand=[
                    'Three of Hearts',
                    'Three of Clubs',
                    'Two of Hearts',
                    'Two of Clubs',
                    'Two of Diamonds',
                ],
                kickers=[],
                rank='Full House'),
        },
        # Flush
        {
            'test': [
                Card(value='ace', suit='h'),
                Card(value='seven', suit='h'),
                Card(value='four', suit='h'),
                Card(value='three', suit='h'),
                Card(value='ten', suit='h'),
            ],
            'expected': EvaluateResponse(
                playingHand=[
                    'Ace of Hearts',
                    'Ten of Hearts',
                    'Seven of Hearts',
                    'Four of Hearts',
                    'Three of Hearts',
                ],
                kickers=[],
                rank='Flush'),
        },
        # Straight
        {
            'test': [
                Card(value='seven', suit='h'),
                Card(value='eight', suit='c'),
                Card(value='nine', suit='d'),
                Card(value='jack', suit='h'),
                Card(value='ten', suit='c'),
            ],
            'expected': EvaluateResponse(
                playingHand=[
                    'Jack of Hearts',
                    'Ten of Clubs',
                    'Nine of Diamonds',
                    'Eight of Clubs',
                    'Seven of Hearts',
                ],
                kickers=[],
                rank='Straight'),
        },
        # Trips
        {
            'test': [
                Card(value='ace', suit='h'),
                Card(value='ace', suit='c'),
                Card(value='ace', suit='d'),
                Card(value='jack', suit='h'),
                Card(value='ten', suit='h'),
            ],
            'expected': EvaluateResponse(
                playingHand=[
                    'Ace of Hearts',
                    'Ace of Clubs',
                    'Ace of Diamonds',
                ],
                kickers=[
                    'Jack of Hearts',
                    'Ten of Hearts',
                ],
                rank='Trips'),
        },
        # Two Doubles
        {
            'test': [
                Card(value='ace', suit='h'),
                Card(value='ace', suit='c'),
                Card(value='queen', suit='h'),
                Card(value='queen', suit='c'),
                Card(value='ten', suit='h'),
            ],
            'expected': EvaluateResponse(
                playingHand=[
                    'Ace of Hearts',
                    'Ace of Clubs',
                    'Queen of Hearts',
                    'Queen of Clubs',
                ],
                kickers=['Ten of Hearts'],
                rank='Two Doubles'),
        },
        # Doubles
        {
            'test': [
                Card(value='ace', suit='h'),
                Card(value='ace', suit='c'),
                Card(value='queen', suit='h'),
                Card(value='jack', suit='c'),
                Card(value='ten', suit='d'),
            ],
            'expected': EvaluateResponse(
                playingHand=[
                    'Ace of Hearts',
                    'Ace of Clubs',
                ],
                kickers=[
                    'Queen of Hearts',
                    'Jack of Clubs',
                    'Ten of Diamonds',
                ],
                rank='Doubles'),
        },
        # Highest
        {
            'test': [
                Card(value='ten', suit='h'),
                Card(value='seven', suit='c'),
                Card(value='two', suit='d'),
                Card(value='three', suit='s'),
                Card(value='queen', suit='h'),
            ],
            'expected': EvaluateResponse(
                playingHand=[
                    'Queen of Hearts',
                ],
                kickers=[
                    'Ten of Hearts',
                    'Seven of Clubs',
                    'Three of Spades',
                    'Two of Diamonds',
                ],
                rank='Highest'),
        },
    ]

    def test_eval_cases(self):
        for case in self.test_cases:
            # Act
            result = evaluate_hand(case['test'])
            # Assert
            self.assertEqual(result, case['expected'], f'\nOutputs not matching for {case['expected'].rank}'
                             f'\nResulted Case : {result}'
                             f'\nExpected Case : {case['expected']}')

if __name__ == '__main__':
    unittest.main()
