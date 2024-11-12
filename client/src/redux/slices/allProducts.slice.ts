import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/helpers/constants/product";

const initialState: Product[] = [];

const allProductSlice = createSlice({
  name: "allProduct",
  initialState,
  reducers: {
    addProduct: (_, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
});

export const { addProduct } = allProductSlice.actions;
export default allProductSlice.reducer;
