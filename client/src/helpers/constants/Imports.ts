import { lazy } from "react";

// Lazy load components
export const Cart = lazy(() => import("@/pages/Cart"));
export const Login = lazy(() => import("@/pages/Login"));
export const Wishlist = lazy(() => import("@/pages/Wishlist"));
export const Register = lazy(() => import("@/pages/Register"));
export const Checkout = lazy(() => import("@/pages/Checkout"));
export const Dashboard = lazy(() => import("@/pages/Dashboard"));
export const UserOrders = lazy(() => import("@/pages/UserOrders"));
export const EditProduct = lazy(() => import("@/pages/EditProduct"));
export const Orders = lazy(() => import("@/components/admin/Orders"));
export const Clients = lazy(() => import("@/components/admin/Clients"));
export const CreateProduct = lazy(() => import("@/pages/CreateProduct"));
export const Products = lazy(() => import("@/components/admin/Products"));
export const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
