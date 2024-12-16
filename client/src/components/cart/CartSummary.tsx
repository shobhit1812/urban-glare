import User from "@/interfaces/user.interface";
import CartItem from "@/interfaces/cart.interface";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCartActions } from "@/helpers/hooks/useCartActions";

interface CartSummaryProps {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems = [],
  setCartItems,
}) => {
  const { handleClearCart } = useCartActions(setCartItems);
  const totalItems =
    cartItems?.reduce((acc, item) => acc + item?.quantity, 0) || 0;
  const totalPrice =
    cartItems?.reduce(
      (acc, item) => acc + (item?.productId?.price || 0) * item?.quantity,
      0
    ) || 0;

  const formattedTotalPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const user: User = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    if (user?._id) {
      navigate("/checkout");
    } else {
      toast.error("Please Login!!!", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 5000,
        draggable: true,
      });
    }
  };

  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-bold">Cart Summary</h2>
        <p className="text-lg">Total Items: {totalItems}</p>
        <p className="text-lg font-semibold">
          Total Price: {formattedTotalPrice}
        </p>
        <Button className="w-full py-3 mt-4 text-lg" onClick={handleClearCart}>
          Clear Cart
        </Button>

        <Button
          className="w-full py-3 mt-4 text-lg bg-green-500 hover:bg-green-600"
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
