import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "@/interfaces/product.interface";

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex !== -1) {
        // Remove if already exists
        state.items.splice(existingIndex, 1);
      } else {
        // Add if not exists
        state.items.push(action.payload);
      }
    },
    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { toggleFavorite, setFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
