import axios from "axios";
import User from "@/interfaces/user.interface";
import Order from "@/interfaces/order.interface";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { BASE_URL } from "@/helpers/constants/server_url";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const Checkout: React.FC = () => {
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const user: User = useSelector((state: RootState) => state.user);
  const checkout: Order = useSelector((state: RootState) => state.checkout);

  const navigate = useNavigate();

  const formattedTotalPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(checkout.totalPrice);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const orderData = {
      products: checkout.products,
      totalItem: checkout.totalItem,
      totalPrice: checkout.totalPrice,
      paymentMethod,
      shippingDetails: {
        address,
        country,
      },
    };

    try {
      await axios.post(`${BASE_URL}/checkout/create-order`, orderData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        withCredentials: true,
      });

      await axios.delete(`${BASE_URL}/cart/clear-cart`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        withCredentials: true,
      });

      navigate("/");
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shipping Details Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Shipping Details</h2>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter your country"
              required
            />
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Payment Method</h2>

          <Select
            onValueChange={(value) => setPaymentMethod(value)}
            value={paymentMethod}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="cod">Cash on Delivery (COD)</SelectItem>
                <SelectItem value="credit-debit">Credit/Debit Card</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {paymentMethod === "credit-debit" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  placeholder="Enter your card number"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    type="password"
                    placeholder="Enter CVV"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                name="upiId"
                type="text"
                placeholder="Enter your UPI ID"
                required
              />
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
          {/* Header */}
          <div className="grid grid-cols-12 text-sm font-bold text-gray-700 border-b pb-2">
            <span className="col-span-6">Product Name</span>
            <span className="col-span-3 text-center">Quantity</span>
            <span className="col-span-3 text-right">Price</span>
          </div>

          {/* Products */}
          {checkout.products.map((product) => (
            <div
              key={product.productId}
              className="grid grid-cols-12 items-center text-sm text-gray-600 py-2 border-b last:border-b-0"
            >
              <span className="col-span-6 truncate">{product.productName}</span>
              <span className="col-span-3 text-center">{`x${product.quantity}`}</span>
              <span className="col-span-3 text-right">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(product.price)}
              </span>
            </div>
          ))}

          {/* Total */}
          <div className="grid grid-cols-12 items-center font-bold text-lg pt-4">
            <span className="col-span-6">Total</span>
            <span className="col-span-3"></span>
            <span className="col-span-3 text-right">{formattedTotalPrice}</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-blue-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <ThreeDots color="#ffffff" height={24} width={24} />
              </div>
            ) : (
              "Confirm Order"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
