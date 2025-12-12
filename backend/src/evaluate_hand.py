from .models.CardModel import Card


def evaluate_hand(hand: list[Card]):
    # Sort
    def sort_hand(c: Card):
        return c.value_as_int
    hand.sort(key=sort_hand, reverse=True)
    # check if same suit

    # check if sequential

    # get groupings

    # determine our evaluation
