class Player:

    all_players = []
    total_players = 0

    def __init__(self, name, deck):
        self.name = name
        self.deck = deck
        self.hand = []
        Player.all_players.append(self)
        Player.total_players += 1
        deck.players.append(self)
    
    @classmethod
    def list_all_players(cls):
        for i in range(len(cls.all_players)):
            print(f"{i + 1} - {cls.all_players[i].name}")

    @classmethod
    def check_players_hands(cls):
        for player in cls.all_players:
            if len(player.hand) > 0:
                return True
        return False


    def list_players_not_self(self):
        my_index = 0
        for i in range(len(Player.all_players)):
            if self != Player.all_players[i]: 
                print(f"{i + 1} - {Player.all_players[i].name}")
            else:
                my_index = i
        return my_index


    def show_cards(self):
        for i in range(len(self.hand)):
            print(f"{ i + 1} - { self.hand[i].card_info() }")
            
