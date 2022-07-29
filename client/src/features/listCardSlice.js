import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  listCards: [],
};

export const addListCard = createAsyncThunk(
  "listCards/addListCard",
  async (data, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/listCards`,
      data
    );
    thunkAPI.dispatch(addNewList(response.data.newListCard));
    return response.data.newListCard;
  }
);

export const fetchListCards = createAsyncThunk(
  "listCards/fetchListCards",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/listCards`
    );
    thunkAPI.dispatch(loadLists(response.data.listCards));
    return response.data.listCards;
  }
);

export const deleteSingleList = createAsyncThunk(
  "listCards/deleteSingleList",
  async (data, thunkAPI) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/listCards/${data}`
    );
    console.log(response.data.card);
    thunkAPI.dispatch(removeList(response.data.card));
    return response.data.card;
  }
);

export const listCardSlice = createSlice({
  name: "listCard",
  initialState,
  reducers: {
    loadLists: (state, action) => {
      state.listCards = action.payload;
    },
    addNewList: (state, action) => {
      state.listCards = [...state.listCards, action.payload];
    },
    removeList: (state, action) => {
      state.listCards = state.listCards.filter(
        (list) => list._id !== action.payload._id
      );
    },
  },
});

export const { addNewList, removeList, loadLists } = listCardSlice.actions;

export const selectListCards = (state) => state.listCard.listCards;

export default listCardSlice.reducer;
