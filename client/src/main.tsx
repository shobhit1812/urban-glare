import { createRoot } from "react-dom/client";
import appRouter from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import store from "./redux/store/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
