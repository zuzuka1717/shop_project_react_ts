import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk<string[]>(
  'categories/fetchCategories',
  async () => {
    try {
      const { data } = await axios.get('https://fakestoreapi.com/products/categories');
      return data;
    }
    catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }
);

type InitialStateCategories = {
  items: string[];
  selectedCategory?: string;
}

const initialState: InitialStateCategories = {
  items: [],
  selectedCategory: 'All',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { setSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;