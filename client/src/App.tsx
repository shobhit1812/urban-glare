/* eslint-disable react-refresh/only-export-components */
import Home from "./pages/Home";
import Error from "./pages/Error";
import Browse from "./pages/Browse";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingFallback from "./components/others/LoadingFallback";

// Lazy load components
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Register = lazy(() => import("./pages/Register"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const Orders = lazy(() => import("./components/admin/Orders"));
const Clients = lazy(() => import("./components/admin/Clients"));
const CreateProduct = lazy(() => import("./pages/CreateProduct"));
const Products = lazy(() => import("./components/admin/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

// Reusable component for loading lazy components with fallback
const LazyLoad: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
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
        children: [
          {
            path: "products",
            element: (
              <LazyLoad>
                <Products />
              </LazyLoad>
            ),
          },
          {
            path: "orders",
            element: (
              <LazyLoad>
                <Orders />
              </LazyLoad>
            ),
          },
          {
            path: "clients",
            element: (
              <LazyLoad>
                <Clients />
              </LazyLoad>
            ),
          },
        ],
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
        path: "edit-product/:productId",
        element: (
          <LazyLoad>
            <EditProduct />
          </LazyLoad>
        ),
      },
      {
        path: ":productName/:productBrand/:productId",
        element: (
          <LazyLoad>
            <ProductDetails />
          </LazyLoad>
        ),
      },
      {
        path: "cart",
        element: (
          <LazyLoad>
            <Cart />
          </LazyLoad>
        ),
      },
      {
        path: "wishlist",
        element: (
          <LazyLoad>
            <Wishlist />
          </LazyLoad>
        ),
      },
      {
        path: "checkout",
        element: (
          <LazyLoad>
            <Checkout />
          </LazyLoad>
        ),
      },
    ],
  },
  {
    path: "auth/register",
    element: (
      <LazyLoad>
        <Register />
      </LazyLoad>
    ),
  },
  {
    path: "auth/login",
    element: (
      <LazyLoad>
        <Login />
      </LazyLoad>
    ),
  },
]);

export default appRouter;
