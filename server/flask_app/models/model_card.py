import uuid

class Card:

    def __init__( self , suit , point_val , string_val ):
        
        self.suit = suit
        self.point_val = point_val
        self.string_val = string_val
        self.id = f'C{uuid.uuid1()}{self.point_val}'

    def card_info(self):
        return(f"{self.string_val} of {self.suit}")

    def serialized(self):
        return {
            "suit": self.suit,
            "point_val": self.point_val,
            "string_val": self.string_val,
            "id" : self.id
        }