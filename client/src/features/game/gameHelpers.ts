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

export const filterCards = (game: WritableDraft<GameInterface>, foundPair: CardInterface) => {

    const playersCopies = [...game.players];
    const playerCopy = { ...playersCopies[game.turn] };

    const hand = [...playerCopy.hand];

    playerCopy.hand = hand.filter(({ id }) => id !== game.selectedCard?.id);

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
        game.saidCards = game.saidCards.filter(({ card }) => card.id !== game.selectedCard?.id || foundPair.id);
    }

    players[game.turn] = playerCopy;
    game.players = players;
    game.selectedCard = undefined;
    game.selectedPlayer = undefined;

    return game
}

// export const computerTurn = (state) => {

//     console.log(state.turn);

//     const gameCopy = { ...state };
//     const playersCopy = [...gameCopy.players];
//     const saidCards = [...gameCopy.saidCards]
//     const computer = { ...playersCopy[gameCopy.turn] };
//     const computerHand = [...computer.hand];

//     let found = {}
//     if (saidCards.length > 0) {
//         // LOOP THORUGH COMP AND SAID CARDS TO FIND MATCH

//         for (const card of computerHand) {
//             for (const oCard of saidCards) {
//                 if (card.point_val === oCard.card.point_val) {
//                     found = { oCard, id: card.id };
//                 }
//             }
//         }

//     }

//     if (Object.keys(found).length > 0) {
//         const chosenPlayer = found.oCard.player;
//         const otherCard = found.oCard.card;
//         console.log("IN SSAID");

//         const { newPlayers, newSaidCards, newPlayer } = filterCards(computer, playersCopy, found.id, otherCard.id, gameCopy.saidCards, chosenPlayer.id)
//         newPlayers[gameCopy.turn] = newPlayer;
//         gameCopy.players = newPlayers;
//         gameCopy.saidCards = newSaidCards;


//     } else {
//         let max = playersCopy.length - 1;
//         let randomInt = Math.floor(Math.random() * max)
//         console.log(randomInt);
//         while (randomInt === gameCopy.turn) {
//             randomInt = Math.floor(Math.random() * max)
//         }
//         const chosenPlayer = { ...playersCopy[randomInt] };

//         const otherPlayerHand = [...chosenPlayer.hand];

//         let compCardInt = Math.floor(Math.random() * computerHand.length - 1);
//         const compCard = { ...computerHand[compCardInt] };

//         let otherCardInt = Math.floor(Math.random() * otherPlayerHand.length - 1);
//         const otherCard = { ...otherPlayerHand[otherCardInt] };

//         if (compCard.point_val === otherCard.point_val) {

//             const { newPlayers, newSaidCards, newPlayer } = filterCards(computer, playersCopy, compCard.id, otherCard.id, gameCopy.saidCards, chosenPlayer.id)
//             newPlayers[gameCopy.turn] = newPlayer;
//             gameCopy.players = newPlayers;
//             gameCopy.saidCards = newSaidCards;
//             console.log("FOUND");
//         } else {
//             console.log("NOT FOND");
//         }
//     }




//     return gameCopy;
// }