from ..models.model_player import Player
from ..models.model_deck import Deck
from ..models.model_goldfish_player import GoldFishPlayer
from flask_app import app
from flask import jsonify


@app.route("/check")
def check():
    print("YES!")
    return jsonify(MSG="YES")


@app.route("/start")
def start():
    print("STARTING")

    deck = Deck()

    player_1 = GoldFishPlayer("Pablo", deck)
    player_2 = GoldFishPlayer("Tyler", deck)
    player_3 = GoldFishPlayer("Jessica", deck)
    player_4 = GoldFishPlayer("Bobby", deck)

    deck.shuffle_cards()

    text_with_pairs = deck.deal_cards(6, [player_1, player_2, player_3, player_4])

    context = {
        "pairs_text": text_with_pairs,
        "deck": deck.serialized(),
        "selectedCard": {},
        "selectedPlayer": {}
    }


    return jsonify(context)



    # i = 0

    # while(Player.check_players_hands()):
    #     if i >= len(Player.all_players):
    #         i = 0
    #     player = Player.all_players[i]
    #     print(
    #         f"***************************   {player.name}'s turn  *************************"
    #         )
    #     if i == 0:
    #         player.turn(True)
    #     else:
    #         player.turn(False)
    #     i += 1
    # Player.list_player_scores()
    

