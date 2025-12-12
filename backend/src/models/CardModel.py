from pydantic import BaseModel


class Card(BaseModel):
    value:str
    suit:str

    _value_to_int_dict = {
        'ace'   : 14,
        'king'  : 13,
        'queen' : 12,
        'jack'  : 11,
        'ten'   : 10,
        'nine'  : 9,
        'eight' : 8,
        'seven' : 7,
        'six'   : 6,
        'five'  : 5,
        'four'  : 4,
        'three' : 3,
        'two'   : 2,
    }

    # Used to get the list of valid values
    @property
    def valid_value_keys(self):
        return list(self._value_to_int_dict)

    @property
    def value_as_int(self):
        # Does our value exist in the CardValueEnum props?
        if not self.value in self.valid_value_keys:
            return None
        return self._value_to_int_dict[self.value]

