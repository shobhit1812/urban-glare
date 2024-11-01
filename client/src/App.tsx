import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

export default appRouter;
