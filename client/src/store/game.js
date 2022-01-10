// ACTIONS

import { setCardToStore, setPlayerToStore, setPairToStore, computerTurn } from "./utils/reducerFunctions";

const START_GAME = "START_GAME";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";
const SET_PLAYER = "SET_PLAYER";
const SET_CARD = "SET_CARD";
const SET_FOUND_PAIR = "SET_FOUND_PAIR";
const TURN_CHECK = "TURN_CHECK";

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

export const checkingForPair = () => {
    return {
        type: SET_FOUND_PAIR,
    }
}

export const turnCheck = () => ({
    type: TURN_CHECK,
})

// REDUCER

const reducer = (state = { isFetching: true }, action) => {
    switch (action.type) {
        case START_GAME:
            return action.game;
        case SET_PLAYER:
            return setPlayerToStore(state, action.player);
        case SET_CARD:
            return setCardToStore(state, action.card);
        case SET_FOUND_PAIR:
            return setPairToStore(state)
        case TURN_CHECK:
            if (state.turn !== 0){
                return computerTurn(state)
            } else {
                return state;
            }
        default:
            return state;
    }
}

export default reducer;
