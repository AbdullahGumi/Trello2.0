import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
};

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (_, thunkAPI) => {
    //fetch only cards specific to list

    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/cards`
    );
    thunkAPI.dispatch(loadCards(response.data.cards));
    return response.data.cards;
  }
);

export const addNewCard = createAsyncThunk(
  "cards/addNewCard",
  async (data, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/cards`,
      data
    );
    thunkAPI.dispatch(addCardToList(response.data.newCard));
    return response.data.newCard;
  }
);

export const moveCardToAnotherList = createAsyncThunk(
  "cards/moveCardToAnotherList",
  async (data, thunkAPI) => {
    const {
      item: { _id },
      listName,
    } = data;
    const response = await axios.put(
      `${process.env.REACT_APP_API_ENDPOINT}/cards/${_id}`,
      { listName }
    );

    thunkAPI.dispatch(moveCard({ item: response.data.card, listName }));
    return response.data.card;
  }
);

// export const deleteSingleCard = createAsyncThunk(
//   "cards/deleteSingleCard",
//   async (data, thunkAPI) => {
//     const response = await axios.delete(
//       `${process.env.REACT_APP_API_ENDPOINT}/cards/${data}`
//     );
//     console.log(response.data.card);
//     thunkAPI.dispatch(removeList(response.data.card));
//     return response.data.card;
//   }
// );

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    loadCards: (state, action) => {
      state.cards = action.payload;
    },
    addCardToList: (state, action) => {
      state.cards = [...state.cards, action.payload];
    },

    moveCard: (state, action) => {
      const { item, listName } = action.payload;
      state.cards = state.cards
        .filter((i) => i._id !== item._id)
        .concat({ ...item, listName });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCardToList, removeFromList, moveCard, loadCards } =
  cardSlice.actions;

export const selectCards = (state) => state.card.cards;

export const selectListCardcardsWithId = (state, id) =>
  state.card.cards.filter((item) => item.id === id);

export const selectCardTotal = (state) =>
  state.card.cards.reduce((total, item) => (total += item.price), 0);

export default cardSlice.reducer;
