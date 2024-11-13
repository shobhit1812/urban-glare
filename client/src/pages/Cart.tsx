import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store/store";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { Product } from "@/helpers/constants/product";
import { BASE_URL } from "@/helpers/constants/server_url";

interface CartItem {
  productId: Product;
  quantity: number;
  _id: string;
}

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
      setCartItems(response.data.cart);
    } catch (error: any) {
      console.error("Error fetching cart items:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCartItems();
  }, [user]);

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
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
        }
      );
      setCartItems(response.data.cart);
    } catch (error: any) {
      console.error("Error updating quantity:", error.message);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await axios.delete(`${BASE_URL}/cart/remove-item`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        data: { productId },
        withCredentials: true,
      });
      setCartItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (error: any) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`${BASE_URL}/cart/clear-cart`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        withCredentials: true,
      });
      setCartItems([]);
    } catch (error: any) {
      console.error("Error clearing cart:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDots height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <CartItemsSection
          cartItems={cartItems}
          onIncrease={(id) => handleQuantityChange(id, true)}
          onDecrease={(id) => handleQuantityChange(id, false)}
          onRemove={handleRemoveItem}
        />
        <CartSummary cartItems={cartItems} onClearCart={handleClearCart} />
      </div>
    </div>
  );
};

interface CartItemsSectionProps {
  cartItems: CartItem[];
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

const CartItemsSection: React.FC<CartItemsSectionProps> = ({
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="flex-1">
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-700">Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b pb-4 mb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.productId?.productImages[0]}
                alt={item.productId?.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {item.productId?.name}
                </h2>
                <p className="text-gray-600">₹ {item.productId?.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => onDecrease(item.productId?._id)}>-</Button>
              <span className="px-3">{item.quantity}</span>
              <Button onClick={() => onIncrease(item.productId?._id)}>+</Button>
              <Button
                onClick={() => onRemove(item.productId?._id)}
                className="ml-4"
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

interface CartSummaryProps {
  cartItems: CartItem[];
  onClearCart: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems,
  onClearCart,
}) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-bold">Cart Summary</h2>
        <p className="text-lg">Total Items: {totalItems}</p>
        <p className="text-lg font-semibold">Total Price: ₹ {totalPrice}</p>
        <Button className="w-full py-3 mt-4 text-lg" onClick={onClearCart}>
          Clear Cart
        </Button>
        <Button className="w-full py-3 mt-4 text-lg bg-green-500 hover:bg-green-600">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default Cart;
