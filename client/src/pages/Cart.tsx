/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import User from "@/interfaces/user.interface";
import CartItem from "@/interfaces/cart.interface";
import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import SliderCards from "@/components/others/SliderCards";
import LoadingSpinner from "@/components/shimmer-effect/LoadingSpinner";

import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "@/store/slices/checkout.slice";
import { BASE_URL } from "@/helpers/constants/server_url";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.user);

  const fetchCartItems = async () => {
    setLoading(true);

    try {
      const response = await axios.get<{ cart: CartItem[] }>(
        `${BASE_URL}/cart/get-cart-items`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
        }
      );

      const products = response.data.cart;

      setCartItems(products);

      const productDetails = products.map((product) => ({
        productId: product.productId._id,
        productName: product.productId.name,
        quantity: product.quantity,
        price: product.totalAmount,
      }));

      dispatch(
        setOrder({
          ownerId: user?._id,
          products: productDetails,
        })
      );
    } catch (error: unknown) {
      console.error("Error fetching cart items: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCartItems();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-screen-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <CartItems cartItems={cartItems} setCartItems={setCartItems} />
        <CartSummary cartItems={cartItems} setCartItems={setCartItems} />
      </div>
      <div className="mt-16">
        <SliderCards />
      </div>
    </div>
  );
};

export default Cart;
