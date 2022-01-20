import { CardInterface, GameInterface, PlayerInterface, SaidCaidInterface } from "./gameInterfaces";
import { WritableDraft } from "immer/dist/internal";


export const checkForPairs = (selectedPlayer: PlayerInterface, selectedCard: CardInterface) => {

    for (const possCard of selectedPlayer.hand) {
        if (selectedCard.point_val === possCard.point_val) {
            return possCard;
        }
    }
    return false;
}

export const checkForPairInSaidCards = (computerHand: Array<CardInterface>, saidCards: Array<SaidCaidInterface>) => {

    for (const card of computerHand) {
        for (const oCard of saidCards) {
            if (card.point_val === oCard.card.point_val) {
                return { otherCard: oCard, myCard: card };
            }
        }
    }
    return false;

}


export const filterCards = (game: WritableDraft<GameInterface>, foundPair: CardInterface) => {

    const playersCopies = [...game.players];
    const playerCopy = { ...playersCopies[game.turn] };

    console.log(playerCopy.name);


    const hand = [...playerCopy.hand];

    playerCopy.hand = hand.filter(({ id }) => id !== game.selectedCard!.id);

    const players = playersCopies.map((oPlayer) => {
        if (oPlayer.id === game.selectedPlayer?.id) {
            const copyPlayer = { ...oPlayer };
            const otherHandCopy = [...copyPlayer.hand]
            copyPlayer.hand = otherHandCopy.filter(({ id }) => id !== foundPair.id);
            return copyPlayer;
        }
        return oPlayer;
    });


    if (game.saidCards.length > 0) {
        game.saidCards = game.saidCards.filter(({ card }) => card.id !== game.selectedCard!.id || foundPair.id);
    }

    players[game.turn] = playerCopy;
    game.players = players;
    game.selectedCard = null;
    game.selectedPlayer = null;

    return game
}

export const computerChooseRandom = (playersCopy: PlayerInterface[], turn: number, computerHand: CardInterface[]) => {

    let max = playersCopy.length - 1;
    let randomInt = Math.floor(Math.random() * max)

    while (randomInt === turn) {
        randomInt = Math.floor(Math.random() * max)
    }
    const chosenPlayer = { ...playersCopy[randomInt] };

    const otherPlayerHand = [...chosenPlayer.hand];

    let compCardInt = Math.floor(Math.random() * computerHand.length - 1);
    const compCard = { ...computerHand[compCardInt] };

    let otherCardInt = Math.floor(Math.random() * otherPlayerHand.length - 1);
    const otherCard = { ...otherPlayerHand[otherCardInt] };

    return {
        compCard,
        otherCard,
        chosenPlayer
    }
    
}