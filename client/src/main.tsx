import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import appRouter from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import store, { persistor } from "./store/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LoadingFallback from "./components/others/LoadingFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingFallback />} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
