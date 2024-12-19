import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Order from "@/interfaces/order.interface";

const initialState: Order | null = null;

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Partial<Order>>) => ({
      ...state,
      ...action.payload,
    }),
    clearOrder: () => null,
  },
});

export const { setOrder, clearOrder } = checkoutSlice.actions;

export default checkoutSlice.reducer;
