import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/user.slice";

// Define RootState and AppDispatch types
const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
