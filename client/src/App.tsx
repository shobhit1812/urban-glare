import Home from "@/pages/Home";
import Error from "@/pages/Error";
import Browse from "@/pages/Browse";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingFallback from "@/components/others/LoadingFallback";
import {
  Cart,
  Login,
  Wishlist,
  Register,
  Checkout,
  Dashboard,
  EditProduct,
  Orders,
  Clients,
  CreateProduct,
  Products,
  ProductDetails,
  UserOrders,
} from "@/helpers/constants/Imports";

// Reusable component for loading lazy components with fallback
const LazyLoad: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;
};

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
      {
        path: "user-order",
        element: (
          <LazyLoad>
            <UserOrders />
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
