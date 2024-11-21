import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/helpers/constants/server_url";
import { CartItem } from "@/helpers/constants/cartItem";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (token: string) => {
    const response = await axios.get<{ cart: CartItem[] }>(
      `${BASE_URL}/cart/get-cart-items`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return response.data.cart.length;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsCount: 0,
  },
  reducers: {
    setItemsCount: (state, action) => {
      state.itemsCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.itemsCount = action.payload;
    });
  },
});

export const { setItemsCount } = cartSlice.actions;
export default cartSlice.reducer;
