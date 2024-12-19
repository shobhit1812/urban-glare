import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Order from "@/interfaces/order.interface";

const initialState: Order | null = null;

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setOrder: (_, action: PayloadAction<Order>) => action.payload,
    clearOrder: () => null,
  },
});

export const { setOrder, clearOrder } = checkoutSlice.actions;

export default checkoutSlice.reducer;
