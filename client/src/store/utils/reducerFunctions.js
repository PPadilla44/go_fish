export const setPlayerToStore = (state, payload) => {
    const gameCopy = { ...state };

    // return if a user card isn't chosen
    if(Object.keys(gameCopy.selectedCard).length < 1) {
        gameCopy.text = ["Must choose a card first"]
        return gameCopy;
    }

    if(Object.keys(gameCopy.selectedPlayer).length > 1) {
        gameCopy.text = ["Player Chosen"]
        return gameCopy;
    }

    gameCopy.selectedPlayer = payload;
    return gameCopy;
}

export const setCardToStore = (state, payload) => {
    const gameCopy = { ...state };
    gameCopy.selectedCard = payload;
    return gameCopy;
}

export const setPairToStore = (state) => {

    let foundPair = {};
    for (const possCard of state.selectedPlayer.hand) {
        if (state.selectedCard.point_val === possCard.point_val) {
            foundPair = possCard;
            break;
        }
    }

    const gameCopy = { ...state };
    if(Object.keys(foundPair).length > 0) {
        const deckCopy = { ...gameCopy.deck};
        const playersCopies = [ ...deckCopy.all_players ]

        let playerCopy = { ...playersCopies[0] };
        let handCopy = [ ...playerCopy.hand ]
        
        playerCopy.hand = handCopy.filter(({id}) => id !== gameCopy.selectedCard.id);

        playersCopies[0] = playerCopy;

        deckCopy.all_players = playersCopies.map((player) => {
            if(player.id === gameCopy.selectedPlayer.id) {
                const copyPlayer = { ...player };
                const otherHandCopy = [ ...copyPlayer.hand ]
                copyPlayer.hand = otherHandCopy.filter(({id}) => id !== foundPair.id);
                return copyPlayer;
            }
            return player;
        })

        gameCopy.selectedCard = {};
        gameCopy.selectedPlayer = {};
        gameCopy.text = ["GOT IT"];
        gameCopy.deck = deckCopy;
    } else {
        gameCopy.text = ["GO FISH"];
    }

    return gameCopy
}
