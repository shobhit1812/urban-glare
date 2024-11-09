/* eslint-disable react-refresh/only-export-components */
import Home from "./pages/Home";
import Error from "./pages/Error";
import Browse from "./pages/Browse";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy load components
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateProduct = lazy(() => import("./pages/CreateProduct"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

// Reusable component for loading lazy components with fallback
const LazyLoad = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Browse />,
      },
      {
        path: "admin-dashboard",
        element: (
          <LazyLoad>
            <Dashboard />
          </LazyLoad>
        ),
      },
      {
        path: "create-product",
        element: (
          <LazyLoad>
            <CreateProduct />
          </LazyLoad>
        ),
      },
      {
        path: "/:productName/:productBrand/:productId",
        element: (
          <LazyLoad>
            <ProductDetails />
          </LazyLoad>
        ),
      },
    ],
  },
  {
    path: "/auth/register",
    element: (
      <LazyLoad>
        <Register />
      </LazyLoad>
    ),
  },
  {
    path: "/auth/login",
    element: (
      <LazyLoad>
        <Login />
      </LazyLoad>
    ),
  },
]);

export default appRouter;
