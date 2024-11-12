import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/helpers/constants/product";

const initialState: Product[] = [];

const filteredProductSlice = createSlice({
  name: "filteredProduct",
  initialState,
  reducers: {
    addFilteredProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
  },
});

export const { addFilteredProduct } = filteredProductSlice.actions;
export default filteredProductSlice.reducer;
