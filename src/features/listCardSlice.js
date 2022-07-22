import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCards: [
    {
      status: "open",
      icon: "⭕️",
      color: "#EB5A46",
    },
    {
      status: "in progress",
      icon: "🔆️",
      color: "#00C2E0",
    },
    {
      status: "in review",
      icon: "📝",
      color: "#C377E0",
    },
    {
      status: "done",
      icon: "✅",
      color: "#3981DE",
    },
  ],
};

export const listCardSlice = createSlice({
  name: "listCard",
  initialState,
  reducers: {
    addToList: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.listCards = [...state.listCards, action.payload];
    },
    removeFromList: (state, action) => {
      const index = state.listCards.findIndex(
        (item) => item.id === action.payload.id
      );

      let newCard = [...state.listCards];

      if (index >= 0) {
        newCard.splice(index, 1);
      } else {
        console.warn(`Can't remove product `);
      }

      state.listCards = newCard;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToList, removeFromList } = listCardSlice.actions;

export const selectListCardcards = (state) => state.listCard.listCards;

export const selectListCardcardsWithId = (state, id) =>
  state.listCard.listCards.filter((item) => item.id === id);

export const selectCardTotal = (state) =>
  state.listCard.listCards.reduce((total, item) => (total += item.price), 0);

export default listCardSlice.reducer;
