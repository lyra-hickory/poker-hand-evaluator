from pydantic import BaseModel
from enum import Enum

class CardValueEnum(Enum):
    ace = 14
    king = 13
    queen = 12
    jack = 11
    ten = 10
    nine = 9
    eight = 8
    seven = 7
    six = 6
    five = 5
    four = 4
    three = 3
    two = 2


class Card(BaseModel):
    value:str
    suit:str

    @property
    def value_as_int(self):
        return getattr(CardValueEnum, self.value)

