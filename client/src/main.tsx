import { createRoot } from "react-dom/client";
import appRouter from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import store, { persistor } from "./redux/store/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={appRouter} />
    </PersistGate>
  </Provider>
);
