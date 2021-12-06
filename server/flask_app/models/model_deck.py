from typing import List
from .model_player import Player
from .model_card import Card
import random
from flask import jsonify

class Deck:


    def __init__( self ):

        suits = [ "spades" , "hearts" , "clubs" , "diamonds" ]
        self.cards = []
        self.players = []

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


    def deal_cards(self, amount, players:List[Player]):
        players_with_pairs = []
        for player in players:
            for x in range(amount):
                player.hand.append(self.cards.pop())
            check_pairs = player.check_for_pairs()
            if check_pairs:
                players_with_pairs.append(check_pairs)

        return players_with_pairs


    def serialized(self):

        serialzed_cards = []
        for card in self.cards:
            serialzed_cards.append(card.serialized())
        
        all_players = []
        for player in self.players:
            serialzed_hand = []
            for card in player.hand:
                serialzed_hand.append(card.serialized())
            all_players.append( {
                "name": player.name,
                "hand": serialzed_hand
            })

        return  {
            "cards": serialzed_cards,
            "all_players": all_players
        }

    