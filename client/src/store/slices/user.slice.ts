import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/helpers/constants/user";

// Define a type for the user state
// Initial state with explicit type or can be `null` if no user is present
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