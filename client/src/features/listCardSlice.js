import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  listCards: [],
};

export const addListCard = createAsyncThunk(
  "listCards/addListCard",
  async (data, thunkAPI) => {
    const response = await api.post(`/api/listCards`, data);
    thunkAPI.dispatch(addNewList(response.data.newListCard));
    return response.data.newListCard;
  }
);

export const fetchListCards = createAsyncThunk(
  "listCards/fetchListCards",
  async (_, thunkAPI) => {
    const response = await api.get(`/api/listCards`);
    thunkAPI.dispatch(loadLists(response.data.listCards));
    return response.data.listCards;
  }
);

export const deleteSingleList = createAsyncThunk(
  "listCards/deleteSingleList",
  async (data, thunkAPI) => {
    const response = await api.delete(`/api/listCards/${data}`);
    thunkAPI.dispatch(removeList(response.data.card));
    return response.data.card;
  }
);

export const changeListName = createAsyncThunk(
  "listCards/changeListName",
  async (newListName, thunkAPI) => {
    const { newListTitle, previousListTitle, _id } = newListName;
    console.log("_id", _id);
    const response = await api.put(`/api/listCards/${_id}`, {
      newListTitle,
      previousListTitle,
    });
    thunkAPI.dispatch(changeListDetails(response.data.card));
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
    changeListDetails: (state, action) => {
      const item = action.payload;
      state.listCards = state.listCards.map((listCard) =>
        listCard._id === item._id ? item : listCard
      );
    },
    removeList: (state, action) => {
      state.listCards = state.listCards.filter(
        (list) => list._id !== action.payload._id
      );
    },
  },
});

export const { addNewList, removeList, loadLists, changeListDetails } =
  listCardSlice.actions;

export const selectListCards = (state) => state.listCard.listCards;

export default listCardSlice.reducer;
