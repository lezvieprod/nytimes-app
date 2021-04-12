import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const reducer = combineReducers({
  rootReducer
})

export const store = configureStore({
  reducer
})


// window.store = store