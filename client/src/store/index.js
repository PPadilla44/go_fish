import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";


import game from "./game";

const appReducer = combineReducers({
  game,
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))