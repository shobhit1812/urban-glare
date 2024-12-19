import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import allProductSlice from "./slices/allProducts.slice";
import filteredProductSlice from "./slices/filteredProducts.slice";
import cartSlice from "./slices/cart.slice";
import favoritesSlice from "./slices/favorites.slice";
import checkoutSlice from "./slices/checkout.slice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "user",
    "allProduct",
    "filteredProduct",
    "cart",
    "favorites",
    "checkout",
  ],
};

const rootReducer = combineReducers({
  user: userSlice,
  allProduct: allProductSlice,
  filteredProduct: filteredProductSlice,
  cart: cartSlice,
  favorites: favoritesSlice,
  checkout: checkoutSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
