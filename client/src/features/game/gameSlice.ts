import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { CardInterface, GameInterface, PlayerInterface } from "./gameInterfaces";
import { computerTurn, setCardToStore, setPlayerToStore } from "./gameReducers";


export interface GameState {
    data: GameInterface;
    status: "idle" | "loading" | "failed";
}

const initialState: GameState = {
    data: {
        cards: [],
        players: [],
        saidCards: [],
        selectedCard: null,
        selectedPlayer: null,
        text: [],
        turn: 0
    },
    status: "loading",
}

export const fetchGame = createAsyncThunk(
    "game/fetchGame",
    async () => {
        const { data } = await axios.get(`http://localhost:5000/start`);
        const gameData = {
            ...data,
            selectedCard: null,
            selectedPlayer: null,
            saidCards: [],
            turn: 0,
        }

        return gameData;
    }
)


export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setSelectedCard: (state, action: PayloadAction<CardInterface>) => { state.data = setCardToStore(state.data, action.payload) },
        setSelectedPlayer: (state, action: PayloadAction<PlayerInterface>) => { state.data = setPlayerToStore(state.data, action.payload) },
        doComputerTurn: (state) => { state.data = computerTurn(state.data) }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGame.pending, (state) => {
            state.status = "loading";
        })
            .addCase(fetchGame.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload;
            })
    },
});
export const { setSelectedCard, setSelectedPlayer, doComputerTurn } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export const selectTurn = (state: RootState) => state.game.data.turn;


export const incrementIfOdd = (): AppThunk => (
    dispatch,
    getState
) => {
    const currTurn = selectTurn(getState());
    
    if (currTurn !== 0) {
        dispatch(doComputerTurn());
    }
    console.log(currTurn);
    

};


export default gameSlice.reducer;