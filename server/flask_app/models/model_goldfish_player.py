from .model_player import Player


class GoldFishPlayer(Player):

    def __init__(self, name, deck):
        super().__init__(name, deck)
        self.pairs = 0

    def check_for_pairs(self):
        total_cards = len(self.hand)
        found_pair = False
        i = 0
        while i < total_cards:
            j = i + 1
            while j < total_cards:
                if self.hand[i].point_val == self.hand[j].point_val:
                    found_pair = True
                    self.hand.pop(i)
                    self.hand.pop(j-1)
                    self.pairs += 1
                    total_cards -= 2
                    i = 0
                    j = 0
                    break
                j += 1
            i += 1
        if found_pair:
            return (f"{self.name} has {self.pairs} pairs!")

    def draw_card(self, amount=1):
        if(len(self.deck.cards) > 0):
            for x in range(amount):
                self.hand.append(self.deck.cards.pop())
        else:
            print(
                f"\n***************************   The deck is empty! {self.name} is out for now!   *************************\n")

    def choose_target(self, my_index):
        is_valid = False
        while(not is_valid):

            target = input("Which player is your target?")

            if target.isnumeric():
                target = int(target)
            else:
                print("Please choose a number to the cooresponding player (NOT NUMBER)")
                continue

            if target > 0 and target <= len(Player.all_players) and target != my_index + 1:
                is_valid = True
            else:
                print("Please choose a number to the cooresponding player (Range)")
                continue

        player = Player.all_players[target-1]
        return player

    def choose_card(self):
        is_valid = False
        while(not is_valid):

            target = input("Which of your cards do you want to choose?")

            if target.isnumeric():
                target = int(target)
            else:
                print("Please choose a number to the cooresponding card (NOT NUMBER)")
                continue

            if target > 0 and target <= len(self.hand):
                is_valid = True
            else:
                print("Please choose a number to the cooresponding card (Range)")
                continue

        card_index = target - 1
        return card_index

    def find_card_in_opp(self, my_card_index, opp):
        for i in range(len(opp.hand)):
            if self.hand[my_card_index].point_val == opp.hand[i].point_val:
                self.hand.pop(my_card_index)
                opp.hand.pop(i)
                self.pairs += 1
                return True
        return False

    def turn(self, isUser: bool):
        won = True
        while(won and Player.check_players_hands()):
            my_index = self.list_players_not_self()
            opp = self.choose_target(my_index)
            print(
                f"\n***************************   Your target player is {opp.name}   *************************\n")
            self.show_cards()
            my_card_index = self.choose_card()
            print(
                f"\n***************************   You asked for the {self.hand[my_card_index].card_info()}   *************************\n")
            is_found = self.find_card_in_opp(my_card_index, opp)
            if is_found:
                print(
                    f"\n***************************   {self.name} has {self.pairs} pairs!   *************************\n")
                print("Keep it going!")
                if len(self.hand) < 1:
                    self.draw_card()
            else:
                print(
                    f"\n***************************   {opp.name} says 'GO FISH'   *************************\n")
                if len(self.deck.cards) > 0:
                    self.draw_card()
                    self.check_for_pairs()
                else:
                    print("No more cards in deck NEXT")
                won = False

    @classmethod
    def list_player_scores(cls):
        winner = cls.all_players[0]
        for player in cls.all_players:
            print(
                f"\n***************************   {player.name} had {player.pairs} pairs   *************************\n")
            if winner.pairs < player.pairs:
                winner = player
        print(
            "******************************************************************************")
        print(
            "******************************************************************************")
        print(
            "******************************************************************************")
        print(
            "***************************                         *************************")
        print(
            f"***************************   {winner.name} IS THE WINNER   *************************")
        print(
            "***************************                         *************************")
        print(
            "******************************************************************************")
        print(
            "******************************************************************************")

    def serialized(self):
        serialzed_cards = []
        for card in self.hand:
            serialzed_cards.append(card.serialized())
        return {
            "name": self.name,
            "hand": serialzed_cards
        }


