import { configureStore } from "@reduxjs/toolkit";
import listCardReducer from "./features/listCardSlice";
import cardReducer from "./features/cardSlice";

export const store = configureStore({
  reducer: {
    listCard: listCardReducer,
    card: cardReducer,
  },
});
