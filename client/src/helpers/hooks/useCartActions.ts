import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CartItem } from "@/helpers/constants/cartItem";
import { BASE_URL } from "@/helpers/constants/server_url";
import { RootState } from "@/redux/store/store";

export const useCartActions = (setCartItems: (items: CartItem[]) => void) => {
  const user = useSelector((state: RootState) => state.user);
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
      const response = await axios.patch(
        `${BASE_URL}/cart/${
          increment ? "increment-cart-quantity" : "decrement-from-cart"
        }`,
        { productId },
        fetchHeaders()
      );
      setCartItems(response?.data?.cart);
    } catch (error) {
      console.error("Error updating quantity:", error.message);
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
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`${BASE_URL}/cart/clear-cart`, fetchHeaders());
      setCartItems([]);
    } catch (error: any) {
      console.error("Error clearing cart:", error.message);
    }
  };

  return {
    loading,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
  };
};
