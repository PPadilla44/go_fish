import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";


import players from "./players";
import game from "./game";

const appReducer = combineReducers({
  players,
  game,
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))