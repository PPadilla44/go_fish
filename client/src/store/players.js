// ACTIONS

const GET_PLAYER = "GET_PLAYER";
const GET_PLAYERS = "GET_PLAYERS";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";


// ACTION CREATORS

export const gotPlayer = (player) => {
    return {
        type: GET_PLAYER,
        player
    };
};

export const gotPlayers = (players) => {
    return {
        type: GET_PLAYERS,
        players
    };
};

export const setFetchingStatus = (isFetching) => ({
    type: SET_FETCHING_STATUS,
    isFetching
});

// REDUCER

const reducer = (state = { isFetching: true }, action) => {
    switch (action.type) {
        case GET_PLAYER:
            return action.player;
        case GET_PLAYERS:
            return action.players;
        case SET_FETCHING_STATUS:
            return {
                ...state,
                isFetching: action.isFetching
            };
        default:
            return state;
    }
};

export default reducer;
