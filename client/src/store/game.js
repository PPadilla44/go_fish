// ACTIONS

const START_GAME = "START_GAME";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";
const SET_PLAYER = "SET_PLAYER";
const SET_CARD = "SET_CARD";


export const gotGame = (game) => {
    return {
        type: START_GAME,
        game,
    };
};

export const setFetchingStatus = (isFetching) => ({
    type: SET_FETCHING_STATUS,
    isFetching
});

export const doneSetPlayer = (player) => {
    return {
        type: SET_PLAYER,
        player
    }
}

export const doneSetCard = (card) => {
    return {
        type: SET_CARD,
        card
    }
}

// REDUCER

const reducer = (state = { isFetching: true }, action) => {
    switch (action.type) {
        case START_GAME:
            return action.game;
        case SET_PLAYER:
            state.selectedPlayer = action.player;
            return state;
        case SET_CARD:
            state.selectedCard = action.card;
            return state;
        default:
            return state;
    }
}

export default reducer;
