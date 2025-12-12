from functools import reduce

from .models.CardModel import Card
from .models.EvalResModel import EvaluateResponse

def hand_to_str_list(hand: list[Card]):
    str_cards = []
    for card in hand:
        str_suit = ''
        match card.suit:
            case 'h':
                str_suit = 'Hearts'
            case 'd':
                str_suit = 'Diamonds'
            case 'c':
                str_suit = 'Clubs'
            case 's':
                str_suit = 'Spades'
            case _:
                str_suit = ''
        str_cards.append(f'{card.value.capitalize()} of {str_suit}')
    return str_cards


def evaluate_hand(hand: list[Card]):
    """
    :param hand: List[card] of length 5
    :return: EvaluateResponse || None if error
    """
    # Escape if we don't get a hand of 5 cards
    if not len(hand) == 5:
        return None

    # Sort
    hand.sort(key=lambda c : c.value_as_int, reverse=True)

    # check if same suit
    def check_if_same_suit(val:Card|bool, e:Card):
        if val == False:
            return False
        if val.suit != e.suit:
            return False
        return e
    is_same_suit = bool( reduce(check_if_same_suit, hand) )

    # check if sequential
    def check_if_sequential(val:Card|bool, e:Card):
        if val == False:
            return False
        if val.value_as_int - e.value_as_int != 1:
            return False
        return e
    is_sequential = bool( reduce(check_if_sequential, hand) )

    # get groupings
    # for optimisation this could be put below the suit and seq evals,
    # however for flow of the reader I am opting to keep the calculations and evaluations separate
    groups = {}
    for card in hand:
        if not card.value in list(groups):
            groups[card.value] = [card]
        else:
            groups[card.value].append(card)

    # Determine our evaluation
    evaluation = EvaluateResponse()

    # We can easily determine the non-grouped ranks by their suit or sequential-ness

    # Royal flush / Straight Flush
    if is_same_suit and is_sequential:
        evaluation.playingHand = hand_to_str_list(hand)
        evaluation.kickers = []
        if hand[0].value == 'ace':
            evaluation.rank = 'Royal Flush'
        else:
            evaluation.rank = 'Straight Flush'
        return evaluation
    # Flush
    if is_same_suit:
        evaluation.playingHand = hand_to_str_list(hand)
        evaluation.kickers = []
        evaluation.rank = 'Flush'
        return evaluation
    # Straight
    if is_sequential:
        evaluation.playingHand = hand_to_str_list(hand)
        evaluation.kickers = []
        evaluation.rank = 'Straight'
        return evaluation

    # Grouped evaluations

    # Highest
    if len(list(groups)) == 5:  # If we have 5 groups that means we have no cards of the same value
        evaluation.playingHand = hand_to_str_list([hand[0]])
        evaluation.kickers = hand_to_str_list(hand[1:])
        evaluation.rank = 'Highest'
        return evaluation

    # Find our groups that will come into play
    playingHand = []
    for key in groups:
        # does our group have more than one card?
        if len(groups[key]) > 1:
            playingHand.extend(groups[key])

    # Find our kickers (groups of size 1)
    kickers = []
    for key in groups:
        if len(groups[key]) == 1:
            kickers.extend(groups[key])

    # Four of a Type
    if len(playingHand) == 4 and len(groups) == 2:  # Two groups means a groupings of 4, 1
        evaluation.playingHand = hand_to_str_list(playingHand)
        evaluation.rank = 'Four of a Type'
        evaluation.kickers = hand_to_str_list(kickers)
        return evaluation
    # Two Doubles
    if len(playingHand) == 4 and len(groups) == 3:  # Three groups means groupings of 2, 2, 1
        evaluation.playingHand = hand_to_str_list(playingHand)
        evaluation.rank = 'Two Doubles'
        evaluation.kickers = hand_to_str_list(kickers)
        return evaluation
    # Trips
    if len(playingHand) == 3 and len(groups) == 3:  # Three groups means groupings of 3, 1, 1
        evaluation.playingHand = hand_to_str_list(playingHand)
        evaluation.rank = 'Trips'
        evaluation.kickers = hand_to_str_list(kickers)
        return evaluation
    # Doubles
    if len(playingHand) == 2:  # Only 2 in our playing hand means doubles
        evaluation.playingHand = hand_to_str_list(playingHand)
        evaluation.rank = 'Doubles'
        evaluation.kickers = hand_to_str_list(kickers)
        return evaluation
    # Full House
    if len(playingHand) == 5:  # Only a set of 3 and 2 can make a playing hand of 5
        evaluation.playingHand = hand_to_str_list(playingHand)
        evaluation.rank = 'Full House'
        evaluation.kickers = []
        return evaluation

    # If none of our above conditions are met then something went wrong somewhere
    return None
