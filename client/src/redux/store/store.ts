import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "../slices/user.slice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH, // Triggers redux-persist to write any pending changes in memory to storage. This ensures that state changes are correctly saved.
  REHYDRATE, // Occurs when the persisted state is reloaded into Redux. This happens when the app starts, or after a page refresh, to restore the saved state from storage.
  PAUSE, // Pauses the persistence of the Redux state. When PAUSE is dispatched, redux-persist temporarily stops saving state changes.
  PERSIST, // Starts the persistence process. When PERSIST is dispatched, redux-persist starts tracking changes to save them in storage.
  PURGE, // Clears the persisted state from storage. Dispatching PURGE will delete the saved data from localStorage or the specified storage.
  REGISTER, // Registers a new persistor. This action is used internally by redux-persist to set up the persistence for the Redux store.
} from "redux-persist";

// Define persist configuration
const persistConfig = {
  key: "root", // Sets the key used to store the data in local storage.
  storage, // Specifies that the data will be saved in localStorage (can also use other storage types).
  whitelist: ["user"], // Only the user slice will be saved (persisted); other slices, if they exist, won’t be saved.
};

// Combine reducers (in case there are more reducers in the future)
const rootReducer = combineReducers({
  user: userSlice,
});

// Wraps rootReducer with persistReducer, adding persistence to the user data. This means Redux will manage the user state, and redux-persist will handle saving it across page reloads.
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    // Adds some default middleware, ignoring some specific redux-persist actions to prevent warnings about serializability.
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>; // Infers the shape of the entire Redux state.
// Gives the type for dispatching actions in the store, making it easier to use with TypeScript.
export type AppDispatch = typeof store.dispatch;

// Create a persistor for the store
export const persistor = persistStore(store); // The object that manages the persisted store.

export default store;
