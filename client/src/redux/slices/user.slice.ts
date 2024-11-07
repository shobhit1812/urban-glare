import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the user state
interface UserState {
  id: string;
  name: string;
  email: string;
}

// Initial state with explicit type or can be `null` if no user is present
const initialState: UserState | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (_, action: PayloadAction<UserState>) => action.payload,
    removeUser: () => null,
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
