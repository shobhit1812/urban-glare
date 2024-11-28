import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "@/interfaces/product.interface";

const initialState: Product[] = [];

const allProductSlice = createSlice({
  name: "allProduct",
  initialState,
  reducers: {
    addProduct: (_, action: PayloadAction<Product[]>) => action.payload,
  },
});

export const { addProduct } = allProductSlice.actions;
export default allProductSlice.reducer;
