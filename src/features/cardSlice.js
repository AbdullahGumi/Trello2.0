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
    addToList: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.cards = [...state.cards, action.payload];
    },
    removeFromList: (state, action) => {
      const index = state.cards.findIndex(
        (item) => item.id === action.payload.id
      );

      let newCard = [...state.cards];

      if (index >= 0) {
        newCard.splice(index, 1);
      } else {
        console.warn(`Can't remove product `);
      }

      state.cards = newCard;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToList, removeFromList } = cardSlice.actions;

export const selectListCardcards = (state) => state.card.cards;

export const selectListCardcardsWithId = (state, id) =>
  state.card.cards.filter((item) => item.id === id);

export const selectCardTotal = (state) =>
  state.card.cards.reduce((total, item) => (total += item.price), 0);

export default cardSlice.reducer;
