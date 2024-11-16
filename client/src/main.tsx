import { createRoot } from "react-dom/client";
import appRouter from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import store, { persistor } from "./store/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
