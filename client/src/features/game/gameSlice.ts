import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { CardInterface, GameInterface, PlayerInterface } from "./gameInterfaces";
import { setCardToStore, setPlayerToStore } from "./gameReducers";


export interface GameState {
    data: GameInterface;
    status: "idle" | "loading" | "failed";
}

const initialState: GameState = {
    data: {
        cards: [],
        players: [],
        saidCards: [],
        selectedCard: undefined,
        selectedPlayer: undefined,
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
            selectedCard: {},
            selectedPlayer: {},
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
        setSelectedCard: (state, action: PayloadAction<CardInterface>) => { state.data = setCardToStore(state.data, action.payload)},
        setSelectedPlayer: (state, action: PayloadAction<PlayerInterface>) => { state.data = setPlayerToStore(state.data, action.payload) },
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

export const { setSelectedCard, setSelectedPlayer } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;