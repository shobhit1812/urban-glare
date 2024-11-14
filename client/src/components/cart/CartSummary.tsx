import { Button } from "@/components/ui/button";
import { CartItem } from "@/helpers/constants/cartItem";
import { useCartActions } from "@/helpers/hooks/useCartActions";

interface CartSummaryProps {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems,
  setCartItems,
}) => {
  const { handleClearCart } = useCartActions(setCartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item?.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item?.productId?.price * item?.quantity,
    0
  );

  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-bold">Cart Summary</h2>
        <p className="text-lg">Total Items: {totalItems}</p>
        <p className="text-lg font-semibold">Total Price: ₹ {totalPrice}</p>
        <Button className="w-full py-3 mt-4 text-lg" onClick={handleClearCart}>
          Clear Cart
        </Button>
        <Button className="w-full py-3 mt-4 text-lg bg-green-500 hover:bg-green-600">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
