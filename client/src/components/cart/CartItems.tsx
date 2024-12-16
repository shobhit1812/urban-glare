import logo from "@/assets/logo.png";
import Empty_Cart from "@/assets/empty_cart.webp";
import CartItem from "@/interfaces/cart.interface";
import QuantityButtonGroup from "./QuantityButtonGroup";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCartActions } from "@/helpers/hooks/useCartActions";

interface CartItemsProps {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

const CartItems: React.FC<CartItemsProps> = ({
  cartItems = [],
  setCartItems,
}) => {
  const { handleQuantityChange, handleRemoveItem } =
    useCartActions(setCartItems);

  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate("/");
  };

  return (
    <div className="flex-1 p-4">
      {!cartItems.length ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src={Empty_Cart}
            alt="empty_cart"
            className="w-64 h-64 object-contain"
          />
          <p className="text-lg text-gray-600 font-medium">
            Your cart is currently empty.
          </p>
          <Button
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
            onClick={handleHomePage}
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="max-h-[500px] overflow-y-auto space-y-4">
          {cartItems.map((item) => (
            <div
              key={item?._id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.productId?.productImages?.[0] || logo}
                  alt={item.productId?.name || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.productId?.name}
                  </h2>
                  <p className="text-gray-600">₹ {item.productId?.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <QuantityButtonGroup
                  productId={item.productId?._id}
                  quantity={item.quantity}
                  onIncrease={(id) => handleQuantityChange(id, true)}
                  onDecrease={(id) => handleQuantityChange(id, false)}
                />
                <Button
                  onClick={() => handleRemoveItem(item.productId?._id)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
