/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/helpers/constants/User";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/store";
import { BASE_URL } from "@/helpers/constants/server_url";

const Dashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<
    "products" | "orders" | "clients"
  >("products");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Redirect if user is not admin
    if (!user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    let url = `${BASE_URL}`;
    if (selectedSection === "products") {
      url += "/product/get-all-products";
    } else if (selectedSection === "clients") {
      url += "/user/get-all-users";
    }

    try {
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setData(
        selectedSection === "products"
          ? response.data.products
          : response.data.users
      );
    } catch (error: any) {
      console.log(error.message);
      setError(`Failed to load ${selectedSection} data`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedSection]);

  return (
    <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 p-4">
        <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => setSelectedSection("products")}
              className={`w-full text-left px-4 py-2 rounded ${
                selectedSection === "products"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              Products
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection("orders")}
              className={`w-full text-left px-4 py-2 rounded ${
                selectedSection === "orders"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection("clients")}
              className={`w-full text-left px-4 py-2 rounded ${
                selectedSection === "clients"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              Clients
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-semibold mb-6 capitalize">
          {selectedSection}
        </h2>

        {loading ? (
          <p>Loading {selectedSection}...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : data.length > 0 ? (
          <div className="overflow-x-auto">
            {selectedSection === "products" && (
              <table className="min-w-full bg-white border border-gray-300 text-left">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-4">Image</th>
                    <th className="p-4">Product ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <img
                          src={product.productImages[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="p-4">{product._id}</td>
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">${product.price}</td>
                      <td className="p-4 space-x-2">
                        <Button className="bg-yellow-500 hover:bg-yellow-600">
                          Edit
                        </Button>
                        <Button variant="destructive">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {selectedSection === "clients" && (
              <table className="min-w-full bg-white border border-gray-300 text-left">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-4">Client ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((client) => (
                    <tr key={client.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{client._id}</td>
                      <td className="p-4">{client.fullName}</td>
                      <td className="p-4">{client.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <p>No data available for {selectedSection}</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
