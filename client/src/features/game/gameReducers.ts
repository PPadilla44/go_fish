import { WritableDraft } from "immer/dist/internal";
import { checkForPairInSaidCards, checkForPairs, computerChooseRandom, filterCards } from "./gameHelpers";
import { CardInterface, GameInterface, PlayerInterface, SaidCaidInterface } from "./gameInterfaces";

export const setPlayerToStore = (data: WritableDraft<GameInterface>, payload: PlayerInterface) => {

    const gameCopy = { ...data };


    // return if a user card isn't chosen
    if (!gameCopy.selectedCard) {
        gameCopy.text = ["Must choose a card first"]
        return gameCopy;
    }

    if (gameCopy.selectedPlayer) {
        gameCopy.text = ["Player Chosen Already Chosen"]
        return gameCopy;
    }


    gameCopy.selectedPlayer = payload;
    let text = `${gameCopy.players[0].name} asked ${gameCopy.selectedPlayer.name} for a ${gameCopy.selectedCard.string_val}`;
    gameCopy.text = [text]

    const foundPair: CardInterface | boolean = checkForPairs(gameCopy.selectedPlayer, gameCopy.selectedCard);


    if (!foundPair) {
        const playersCopies = [...gameCopy.players];
        const playerCopy = { ...playersCopies[gameCopy.turn] };
        gameCopy.saidCards = [...gameCopy.saidCards, { card: gameCopy.selectedCard, player: playerCopy }]
        gameCopy.text = ["GO FISH"];
        let turn = gameCopy.turn;
        gameCopy.turn = turn + 1;
        return gameCopy
    }

    return filterCards(gameCopy, foundPair);
}

export const setCardToStore = (data: WritableDraft<GameInterface>, payload: CardInterface) => {
    return { ...data, selectedCard: payload }
}

export const computerTurn = (game: WritableDraft<GameInterface>) => {


    const gameCopy = { ...game };
    const playersCopy = [...gameCopy.players];
    const saidCards = [...gameCopy.saidCards]
    const computer = { ...playersCopy[gameCopy.turn] };
    const computerHand = [...computer.hand];
    let turnCopy = gameCopy.turn;

    console.log(computer.name);

    if (saidCards.length < 1) {
        console.log("RANDOM CARDS");


        const { compCard, otherCard, chosenPlayer } = computerChooseRandom(playersCopy, game.turn, computerHand)

        if (compCard.point_val === otherCard.point_val) {

            gameCopy.selectedCard = compCard;
            gameCopy.selectedPlayer = chosenPlayer

            console.log("FOUND RANDOMSLY");
            return filterCards(gameCopy, otherCard)
        }

        turnCopy++
        if (turnCopy > 3) {
            gameCopy.turn = 0;
        } else {
            gameCopy.turn = turnCopy;
        }

        console.log("NOT FOND Randomly");
        return gameCopy;

    }

    const found: false | { otherCard: SaidCaidInterface; myCard: CardInterface } = checkForPairInSaidCards(computerHand, saidCards);

    if (found) {
        gameCopy.selectedPlayer = found.otherCard.player;
        gameCopy.selectedCard = found.myCard;

        console.log(gameCopy.selectedPlayer.name);


        console.log('IN SAID CARDS');

        return filterCards(gameCopy, found.otherCard.card)

    }

    console.log("NOT IN SAID CARDS");
    const { compCard, otherCard, chosenPlayer } = computerChooseRandom(playersCopy, game.turn, computerHand)

    if (compCard.point_val === otherCard.point_val) {

        gameCopy.selectedCard = compCard;
        gameCopy.selectedPlayer = chosenPlayer

        console.log("FOUND RANDOMSLY");
        return filterCards(gameCopy, otherCard)
    }
    console.log("NOT FOND Randomly");

    turnCopy++
    if (turnCopy > 3) {
        gameCopy.turn = 0;
    } else {
        gameCopy.turn = turnCopy;
    }

    return gameCopy;
}