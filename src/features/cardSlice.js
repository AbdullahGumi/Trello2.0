import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [
    {
      id: 1,
      icon: "⭕️",
      status: "open",
      title: "Human Interest Form",
      content: "Fill out human interest distribution form",
    },
    {
      id: 2,
      icon: "⭕️",
      status: "done",
      title: "Purchase present",
      content: "Get an anniversary gift",
    },
    {
      id: 3,
      icon: "⭕️",
      status: "in review",
      title: "Invest in investments",
      content: "Call the bank to talk about investments",
    },
    {
      id: 4,
      icon: "⭕️",
      status: "in progress",
      title: "Daily reading",
      content: "Finish reading Intro to UI/UX",
    },
  ],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCardToList: (state, action) => {
      state.cards = [...state.cards, action.payload];
    },
    setCards: (state, action) => {
      const { item, status } = action.payload;
      state.cards = state.cards
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status });
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
