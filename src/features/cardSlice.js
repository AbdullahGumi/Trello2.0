import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCardToList: (state, action) => {
      state.cards = [...state.cards, action.payload];
    },
    setCards: (state, action) => {
      const { item, listName } = action.payload;
      state.cards = state.cards
        .filter((i) => i.id !== item.id)
        .concat({ ...item, listName });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCardToList, removeFromList, setCards } = cardSlice.actions;

export const selectCards = (state) => state.card.cards;

export const selectListCardcardsWithId = (state, id) =>
  state.card.cards.filter((item) => item.id === id);

export const selectCardTotal = (state) =>
  state.card.cards.reduce((total, item) => (total += item.price), 0);

export default cardSlice.reducer;
