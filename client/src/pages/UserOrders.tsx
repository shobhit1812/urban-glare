import axios from "axios";
import User from "@/interfaces/user.interface";
import NO_ORDER from "@/assets/no_orders.webp";
import Order from "@/interfaces/order.interface";
import SliderCards from "@/components/others/SliderCards";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/helpers/constants/server_url";

const UserOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${BASE_URL}/checkout/get-user-order`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            withCredentials: true,
          }
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.token]);

  return (
    <div className="max-w-screen-2xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Your Orders</h1>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <p className="text-gray-600">
                  <span className="font-semibold">Order ID:</span> {order._id}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="capitalize text-blue-500">
                    {order.status}
                  </span>
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Order Date:</span>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 font-semibold mt-4">Products:</p>
                <ul className="ml-4 list-disc text-gray-700">
                  {order.products.map((product) => (
                    <li key={product.productId}>
                      <span>{product.productName}</span> - {product.quantity} x
                      ${product.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 p-4 flex justify-between items-center">
                <p className="font-semibold text-gray-800">
                  Total: $
                  {order.products.reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  )}
                </p>
                <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition duration-200">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <img
            src={NO_ORDER}
            alt="No orders found"
            className="mx-auto h-64 rounded-md w-auto"
          />
          <p className="text-gray-600 mt-4">You have no orders yet.</p>
        </div>
      )}
      <div className="pt-10">
        <SliderCards />
      </div>
    </div>
  );
};

export default UserOrders;
