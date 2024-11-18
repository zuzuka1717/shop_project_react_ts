import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { InitialStateType, Item } from './../../models/models';

const BASE_API = 'https://fakestoreapi.com/products';

export const getProductFromCategories = createAsyncThunk<Item[], string>(
  'category/fetchProductCategories',
  async (category: string) => {
    try {
      const { data } = await axios.get(category === 'All' ? BASE_API : `${BASE_API}/category/${category}`);
      return data;
    }
    catch (er) {
      console.log('error: ', er)
      return isRejectedWithValue('Failed to fetch products')
    }
  }
);

const initialState: InitialStateType = {
  items: [],
};

const productsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.items = state.items.filter(it => it.title.toLowerCase().includes(action.payload.toLowerCase()));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductFromCategories.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { setSearchValue } = productsSlice.actions;
export default productsSlice.reducer;