from .model_card import Card
import random

class Deck:


    def __init__( self ):

        suits = [ "spades" , "hearts" , "clubs" , "diamonds" ]
        self.cards = []

        for s in suits:
            for i in range(1,14):
                str_val = ""
                if i == 1:
                    str_val = "Ace"
                elif i == 11:
                    str_val = "Jack"
                elif i == 12:
                    str_val = "Queen"
                elif i == 13:
                    str_val = "King"
                else:
                    str_val = str(i)
                self.cards.append( Card( s , i , str_val ) )


    def show_cards(self):
        for card in self.cards:
            card.card_info()


    def shuffle_cards(self): 
        shuffed_deck = []
        while len(self.cards) > 0:
            shuffed_deck.append(self.cards.pop(random.randint(0, len(self.cards) -1)))
        self.cards = shuffed_deck


    def deal_cards(self, amount, players):
        for player in players:
            for x in range(amount):
                player.hand.append(self.cards.pop())
            player.check_for_pairs()