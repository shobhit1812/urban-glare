import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/helpers/constants/server_url";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "@/helpers/constants/user";

interface FavoriteState {
  items: string[]; // List of product IDs
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  items: [],
  loading: false,
  error: null,
};

// Async action to fetch user favorites
export const fetchFavorites = createAsyncThunk(
  "favorite/fetchFavorites",
  async (userId: string | null, { rejectWithValue }) => {
    try {
      const user: User | null = useSelector((state: RootState) => state.user);
      if (!userId) return []; // If no user, return an empty array
      const response = await axios.get(
        `${BASE_URL}/favorite/get-all-favorites`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
          withCredentials: true,
        }
      );
      return response.data.favorites.map((item: any) => item._id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch favorites"
      );
    }
  }
);

// Async action to toggle favorite
export const toggleFavorite = createAsyncThunk(
  "favorite/toggleFavorite",
  async (productId: string, { rejectWithValue }) => {
    try {
      const user: User | null = useSelector((state: RootState) => state.user);
      const response = await axios.post(
        `${BASE_URL}/favorite/toggle-favorites`,
        { productId },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
          withCredentials: true,
        }
      );
      return response.data.favorites;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle favorite"
      );
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchFavorites.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(
        toggleFavorite.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.items = action.payload;
        }
      )
      .addCase(toggleFavorite.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export default favoriteSlice.reducer;
