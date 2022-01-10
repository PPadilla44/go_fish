export const setPlayerToStore = (state, payload) => {

    if (state.turn !== 0) {
        return state
    }

    const gameCopy = { ...state };

    // return if a user card isn't chosen
    if (Object.keys(gameCopy.selectedCard).length < 1) {
        gameCopy.text = ["Must choose a card first"]
        return gameCopy;
    }

    if (Object.keys(gameCopy.selectedPlayer).length > 1) {
        gameCopy.text = ["Player Chosen"]
        return gameCopy;
    }


    gameCopy.selectedPlayer = payload;
    let text = `${gameCopy.players[0].name} asked ${gameCopy.selectedPlayer.name} for a ${gameCopy.selectedCard.point_val}`;
    gameCopy.text = [text]
    return gameCopy;
}

const filterCards = (playerCopy, playersCopies, selectedCardId, foundPairId, saidCards, selectedPlayerId) => {
    const player = { ...playerCopy };
    const hand = [...player.hand];

    player.hand = hand.filter(({ id }) => id !== selectedCardId);

    const players = playersCopies.map((oPlayer) => {
        if (oPlayer.id === selectedPlayerId) {
            const copyPlayer = { ...oPlayer };
            const otherHandCopy = [...copyPlayer.hand]
            copyPlayer.hand = otherHandCopy.filter(({ id }) => id !== foundPairId);
            return copyPlayer;
        }
        return oPlayer;
    });

    let saidCardsCopy = [...saidCards];
    if (saidCardsCopy.length > 0) {
        saidCardsCopy = saidCardsCopy.filter(({ id }) => id !== selectedCardId || foundPairId);
    }

    return {
        newPlayers: players,
        newSaidCards: saidCards,
        newPlayer: player,
    }
}

export const setCardToStore = (state, payload) => {

    if (state.turn !== 0) {
        return state
    }

    const gameCopy = { ...state };
    gameCopy.selectedCard = payload;
    return gameCopy;
}

export const setPairToStore = (state) => {

    if (Object.keys(state.selectedPlayer).length < 1) {
        return state;
    }

    let foundPair = {};
    for (const possCard of state.selectedPlayer.hand) {
        if (state.selectedCard.point_val === possCard.point_val) {
            foundPair = possCard;
            break;
        }
    }

    const gameCopy = { ...state };
    const playersCopies = [...gameCopy.players];
    const playerCopy = { ...playersCopies[gameCopy.turn] };

    if (Object.keys(foundPair).length > 0) {

        const { newPlayers, newSaidCards, newPlayer } = filterCards(playerCopy, playersCopies, gameCopy.selectedCard.id, foundPair.id, gameCopy.saidCards, gameCopy.selectedPlayer.id)
        newPlayers[gameCopy.turn] = newPlayer;
        gameCopy.players = newPlayers;
        gameCopy.saidCards = newSaidCards;

    } else {
        gameCopy.saidCards = [...gameCopy.saidCards, { card: gameCopy.selectedCard, player: playerCopy }]
        gameCopy.text = ["GO FISH"];
        let turn = gameCopy.turn;
        gameCopy.turn = turn + 1;
    }

    gameCopy.selectedCard = {};
    gameCopy.selectedPlayer = {};

    return gameCopy
}

export const computerTurn = (state) => {

    console.log(state.turn);

    const gameCopy = { ...state };
    const playersCopy = [...gameCopy.players];
    const saidCards = [...gameCopy.saidCards]
    const computer = { ...playersCopy[gameCopy.turn] };
    const computerHand = [...computer.hand];

    let found = {}
    if (saidCards.length > 0) {
        // LOOP THORUGH COMP AND SAID CARDS TO FIND MATCH

        for (const card of computerHand) {
            for (const oCard of saidCards) {
                if (card.point_val === oCard.card.point_val) {
                    found = { oCard, id: card.id };
                }
            }
        }

    }

    if (Object.keys(found).length > 0) {
        const chosenPlayer = found.oCard.player;
        const otherCard = found.oCard.card;
        console.log("IN SSAID");

        const { newPlayers, newSaidCards, newPlayer } = filterCards(computer, playersCopy, found.id, otherCard.id, gameCopy.saidCards, chosenPlayer.id)
        newPlayers[gameCopy.turn] = newPlayer;
        gameCopy.players = newPlayers;
        gameCopy.saidCards = newSaidCards;


    } else {
        let max = playersCopy.length - 1;
        let randomInt = Math.floor(Math.random() * max)
        console.log(randomInt);
        while (randomInt === gameCopy.turn) {
            randomInt = Math.floor(Math.random() * max)
        }
        const chosenPlayer = { ...playersCopy[randomInt] };

        const otherPlayerHand = [...chosenPlayer.hand];

        let compCardInt = Math.floor(Math.random() * computerHand.length - 1);
        const compCard = { ...computerHand[compCardInt] };

        let otherCardInt = Math.floor(Math.random() * otherPlayerHand.length - 1);
        const otherCard = { ...otherPlayerHand[otherCardInt] };

        if (compCard.point_val === otherCard.point_val) {

            const { newPlayers, newSaidCards, newPlayer } = filterCards(computer, playersCopy, compCard.id, otherCard.id, gameCopy.saidCards, chosenPlayer.id)
            newPlayers[gameCopy.turn] = newPlayer;
            gameCopy.players = newPlayers;
            gameCopy.saidCards = newSaidCards;
            console.log("FOUND");
        } else {
            console.log("NOT FOND");
        }
    }




    return gameCopy;
}
