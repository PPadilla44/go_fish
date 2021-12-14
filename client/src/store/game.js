// ACTIONS

const START_GAME = "START_GAME";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";


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

// REDUCER

const reducer = (state = { isFetching: true }, action) => {
    switch (action.type) {
        case START_GAME:
            return action.game;
        
        default:
            return state;
    }
}

export default reducer;
