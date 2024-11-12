import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/helpers/constants/product";

const initialState: Product[] = [];

const allProductSlice = createSlice({
  name: "allProduct",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
  },
});

export const { addProduct } = allProductSlice.actions;
export default allProductSlice.reducer;
