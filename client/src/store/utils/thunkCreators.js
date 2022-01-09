import axios from "axios";
import { doneSetCard, doneSetPlayer, gotGame, checkingForPair } from "../game";
import { gotPlayers } from "../players";

// START GAME
export const fetchGame = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/start`);
        const { deck } = data;
        dispatch(gotPlayers(deck.all_players))
        dispatch(gotGame(data));
    } catch (error) {
        console.error(error);
    }
}

export const setPlayer = (player) => async (dispatch) => {
    if (!player.is_user) {
        dispatch(doneSetPlayer(player));
        dispatch(checkingForPair());
    }
}

export const setCard = (card, isUser) => async (dispatch) => {
    if (isUser){
        dispatch(doneSetCard(card));
    }
}


// PLAYER THUNK CREATORS
// export const fetchPlayers