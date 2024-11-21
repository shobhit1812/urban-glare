import logo from "@/assets/logo.png";
import Empty_Cart from "@/assets/empty_cart.webp";
import CartItem from "@/interfaces/cart.interface";
import QuantityButtonGroup from "./QuantityButtonGroup";

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

  return (
    <div className="flex-1">
      {!cartItems.length ? (
        <div className="flex justify-center items-center">
          <img
            src={Empty_Cart}
            alt="empty_cart"
            className="w-96 h-96 rounded-3xl"
          />
        </div>
      ) : (
        <div className="max-h-[500px] overflow-y-auto p-4 border rounded-md shadow-md">
          {cartItems.map((item) => (
            <div
              key={item?._id}
              className="flex items-center justify-between border-b pb-4 mb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.productId?.productImages?.[0] || logo}
                  alt={item.productId?.name || "Product Image"}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.productId?.name}
                  </h2>
                  <p className="text-gray-600">₹ {item.productId?.price}</p>
                </div>
              </div>
              <QuantityButtonGroup
                productId={item.productId?._id}
                quantity={item.quantity}
                onIncrease={(id) => handleQuantityChange(id, true)}
                onDecrease={(id) => handleQuantityChange(id, false)}
              />
              <Button
                onClick={() => handleRemoveItem(item.productId?._id)}
                className="ml-4 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
