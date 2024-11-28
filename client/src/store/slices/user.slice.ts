import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "@/interfaces/user.interface";

const initialState: User | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (_, action: PayloadAction<User>) => action.payload,
    removeUser: () => null,
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
