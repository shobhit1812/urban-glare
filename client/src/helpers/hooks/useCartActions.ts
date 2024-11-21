import axios from "axios";
import User from "@/interfaces/user.interface";
import CartItem from "@/interfaces/cart.interface";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BASE_URL } from "@/helpers/constants/server_url";

export const useCartActions = (setCartItems: (items: CartItem[]) => void) => {
  const user: User = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);

  const fetchHeaders = () => ({
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    withCredentials: true,
  });

  const handleQuantityChange = async (
    productId: string,
    increment: boolean
  ) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${BASE_URL}/cart/${
          increment ? "increment-cart-quantity" : "decrement-from-cart"
        }`,
        { productId },
        fetchHeaders()
      );
      setCartItems(response?.data?.cart);
    } catch (error: unknown) {
      console.error("Error while updating quantity: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await axios.delete(`${BASE_URL}/cart/remove-item-from-cart`, {
        ...fetchHeaders(),
        data: { productId },
      });
      setCartItems((prev) =>
        prev.filter((item) => item?.productId?._id !== productId)
      );
    } catch (error: unknown) {
      console.error("Error while removing item from cart: ", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`${BASE_URL}/cart/clear-cart`, fetchHeaders());
      setCartItems([]);
    } catch (error: unknown) {
      console.error("Error while clearing cart: ", error);
    }
  };

  return {
    loading,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
  };
};
