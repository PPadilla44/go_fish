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

    console.log(text);


    const foundPair: CardInterface | boolean = checkForPairs(gameCopy.selectedPlayer, gameCopy.selectedCard);


    if (!foundPair) {
        const playersCopies = [...gameCopy.players];
        const playerCopy = { ...playersCopies[gameCopy.turn] };
        if (!checkForPairInSaidCards(playerCopy.hand, gameCopy.saidCards)) {
            gameCopy.saidCards = [...gameCopy.saidCards, { card: gameCopy.selectedCard, player: playerCopy }]
        }
        gameCopy.text = ["GO FISH"];
        let turn = gameCopy.turn;
        gameCopy.turn = turn + 1;
        gameCopy.selectedPlayer = null;
        console.log("REDUCER", gameCopy.saidCards);
        console.log("REDUCER", gameCopy.saidCards.length);
        return gameCopy
    }
    console.log("REDUCER", gameCopy.saidCards);
    console.log("REDUCER", gameCopy.saidCards.length);
    
    return filterCards(gameCopy, foundPair);
}

export const setCardToStore = (data: WritableDraft<GameInterface>, payload: CardInterface) => {
    console.log("CHOSEN CARd");

    return { ...data, selectedCard: payload }
}

export const computerTurn = (game: WritableDraft<GameInterface>) => {


    const gameCopy = { ...game };
    const playersCopy = [...gameCopy.players];
    const saidCards = [...gameCopy.saidCards]
    const computer = { ...playersCopy[gameCopy.turn] };
    const computerHand = [...computer.hand];
    let turnCopy = gameCopy.turn;


    if (saidCards.length < 1) {


        const { compCard, otherCard, chosenPlayer } = computerChooseRandom(playersCopy, game.turn, computerHand);

        if (compCard.point_val === otherCard.point_val) {

            gameCopy.selectedCard = compCard;
            gameCopy.selectedPlayer = chosenPlayer
            let text = `${computer.name} asked ${chosenPlayer.name} for a ${compCard.string_val}`;
            console.log(text);

            gameCopy.text = [text]
            return filterCards(gameCopy, otherCard)
        }

        turnCopy++
        if (turnCopy > 3) {
            gameCopy.turn = 0;
        } else {
            gameCopy.turn = turnCopy;
        }
        let text = `${computer.name} asked ${chosenPlayer.name} for a ${compCard.string_val}`;
        gameCopy.text = [text]
        gameCopy.saidCards = [...gameCopy.saidCards, { card: compCard, player: computer }]

        console.log(text);

        return gameCopy;

    }

    const found: false | { otherCard: SaidCaidInterface; myCard: CardInterface } = checkForPairInSaidCards(computerHand, saidCards);

    if (found) {
        gameCopy.selectedPlayer = found.otherCard.player;
        gameCopy.selectedCard = found.myCard;

        console.log(gameCopy.selectedPlayer.name);


        let text = `${computer.name} asked ${found.otherCard.player.name} for a ${found.myCard.string_val}`;
        console.log(text);

        gameCopy.text = [text]
        return filterCards(gameCopy, found.otherCard.card)

    }

    const { compCard, otherCard, chosenPlayer } = computerChooseRandom(playersCopy, game.turn, computerHand)
    console.log(compCard);

    if (compCard.point_val === otherCard.point_val) {

        gameCopy.selectedCard = compCard;
        gameCopy.selectedPlayer = chosenPlayer

        let text = `${computer.name} asked ${chosenPlayer.name} for a ${compCard.string_val}`;
        console.log(text);

        gameCopy.text = [text]
        return filterCards(gameCopy, otherCard)
    }


    turnCopy++
    if (turnCopy > 3) {
        gameCopy.turn = 0;
    } else {
        gameCopy.turn = turnCopy;
    }
    gameCopy.saidCards = [...gameCopy.saidCards, { card: compCard, player: computer }]

    let text = `${computer.name} asked ${chosenPlayer.name} for a ${compCard.string_val}`;
    console.log(text);
    gameCopy.text = [text]

    return gameCopy;
}