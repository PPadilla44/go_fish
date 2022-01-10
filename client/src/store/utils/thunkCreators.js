import axios from "axios";
import { doneSetCard, doneSetPlayer, gotGame, checkingForPair, turnCheck } from "../game";

// START GAME
export const fetchGame = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/start`);

        const gameData = {
            ...data,
            selectedCard: {},
            selectedPlayer: {},
            saidCards: [],
            turn: 0,
        }

        dispatch(gotGame(gameData));
    } catch (error) {
        console.error(error);
    }
}



export const setPlayer = (player) => async (dispatch) => {
    if (!player.is_user) {
        dispatch(doneSetPlayer(player));
        dispatch(checkingForPair());
        dispatch(turnCheck())
    }
}

export const setCard = (card, isUser) => async (dispatch) => {
    if (isUser){
        dispatch(doneSetCard(card));
    }
}


// PLAYER THUNK CREATORS
// export const fetchPlayers