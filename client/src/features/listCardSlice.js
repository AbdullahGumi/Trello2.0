import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCards: [],
};

export const listCardSlice = createSlice({
  name: "listCard",
  initialState,
  reducers: {
    addNewList: (state, action) => {
      state.listCards = [...state.listCards, action.payload];
    },
    removeList: (state, action) => {
      state.listCards = state.listCards.filter(
        (list) => list.id !== action.payload
      );
    },
  },
});

export const { addNewList, removeList } = listCardSlice.actions;

export const selectListCards = (state) => state.listCard.listCards;

export default listCardSlice.reducer;
