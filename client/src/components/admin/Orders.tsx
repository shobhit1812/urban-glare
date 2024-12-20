import axios from "axios";
import User from "@/interfaces/user.interface";
import Order from "@/interfaces/order.interface";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/helpers/constants/server_url";

const Orders = () => {
  const navigate = useNavigate();
  const user: User = useSelector((state: RootState) => state.user);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Redirect if user is not admin
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`${BASE_URL}/checkout/get-all-order`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setOrders(response.data.orders);
      } catch (error: unknown) {
        setError("Failed to fetch orders.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.token]);

  return (
    <div>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-left hidden sm:table">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4">Email</th>
                <th className="p-4">Total Items</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Order Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{order.owner.email}</td>
                  <td className="p-4">{order.totalItem}</td>
                  <td className="p-4">${order.totalPrice}</td>
                  <td className="p-4">{order.paymentMethod}</td>
                  <td className="p-4">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 capitalize">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile-friendly view */}
          <div className="space-y-4 sm:hidden">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-4 border border-gray-300 rounded-lg bg-white"
              >
                <p>
                  <span className="font-bold">Email:</span> {order.owner.email}
                </p>
                <p>
                  <span className="font-bold">Total Items:</span>{" "}
                  {order.totalItem}
                </p>
                <p>
                  <span className="font-bold">Total Price:</span> $
                  {order.totalPrice}
                </p>
                <p>
                  <span className="font-bold">Payment Method:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-bold">Order Date:</span>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-bold">Status:</span>{" "}
                  <span className="capitalize">{order.status}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default Orders;
