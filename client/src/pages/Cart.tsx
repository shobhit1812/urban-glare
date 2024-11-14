/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store/store";
import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import { CartItem } from "@/helpers/constants/cartItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BASE_URL } from "@/helpers/constants/server_url";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

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
      setCartItems(response?.data?.cart);
    } catch (error: any) {
      console.error("Error fetching cart items:", error.message);
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
    </div>
  );
};

export default Cart;
