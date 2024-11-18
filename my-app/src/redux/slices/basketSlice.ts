import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from '../../models/models';

type BasketInitialState = {
  basket: Item[];
  totalSum: number;
  totalCount: number;
  localStorageItems: Item[],
}

const initialState: BasketInitialState = {
  basket: [],
  totalSum: 0,
  totalCount: 0,
  localStorageItems: [],
}

export const basketSlice = createSlice({
  name: 'shopBasket',
  initialState,
  reducers: {
    addProductToBasket: (state, action: PayloadAction<Partial<Item>>) => {
      const { id, title, price, image, count } = action.payload;

      localStorage.setItem(id?.toString()!, JSON.stringify({
        title,
        price,
        count,
        image
      }));

      let keyIds = Object.keys(localStorage);

      state.localStorageItems = keyIds.map(id => {
        const item = localStorage.getItem(id);
        if (item) {
          const productObj = JSON.parse(item);
          return { ...productObj, id: Number(id) };
        }
      });

      state.totalSum = getTotalSum(state);
      state.totalCount = getTotalCount(state);
    },

    removeProductFromBasket: (state, action: PayloadAction<string>) => {
      const id = action.payload.toString();

      if (localStorage.getItem(id)) {
        const item = JSON.parse(localStorage.getItem(id)!);

        if (item.count > 1) {
          item.count -= 1;
          item.price = item.price * item.count;
        } else {
          localStorage.removeItem(id);
        }
      }

      state.totalSum = getTotalSum(state);
      state.totalCount = getTotalCount(state);
    },

    loadLocalStorageItems: (state) => {
      let keyIds = Object.keys(localStorage);

      state.localStorageItems = keyIds.map(id => {
        const item = localStorage.getItem(id);
        if (item) {
          const productObj = JSON.parse(item);
          return { ...productObj, id: Number(id) };
        }
      });

      state.totalSum = getTotalSum(state);
      state.totalCount = getTotalCount(state);
    },
  }
});

function getTotalSum(state: BasketInitialState): number {
  return Math.floor(state.localStorageItems.reduce((acc, product) => {
    return acc + product.price * product.count;
  }, 0));
}

function getTotalCount(state: BasketInitialState): number {
  return state.localStorageItems.reduce((acc, product) => {
    return acc + product.count;
  }, 0);
}

export const { addProductToBasket, removeProductFromBasket, loadLocalStorageItems } = basketSlice.actions;
export default basketSlice.reducer;