import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/helpers/constants/product";

const initialState: Product[] = [];

const filteredProductSlice = createSlice({
  name: "filteredProduct",
  initialState,
  reducers: {
    addFilteredProduct: (_, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
    clearProducts: () => {
      return [];
    },
  },
});

export const { addFilteredProduct, clearProducts } =
  filteredProductSlice.actions;
export default filteredProductSlice.reducer;