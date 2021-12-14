import axios from "axios";
import { gotGame } from "../game";
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

// PLAYER THUNK CREATORS
// export const fetchPlayers