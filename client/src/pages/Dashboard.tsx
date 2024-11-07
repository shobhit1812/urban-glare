import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "@/redux/store/store";
import { BASE_URL } from "@/helpers/constants/server_url";

const Dashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<
    "products" | "orders" | "clients"
  >("products");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.user?.token);

  // Fetch data based on selected section
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/product/get-all-products`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      setData(response.data.products);
    } catch (err: any) {
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
      <div className="w-full md:w-1/4 bg-gray-200 p-4">
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
        ) : data ? (
          <div>
            {/* Render data based on selected section */}
            {selectedSection === "products" && (
              <div>
                <h3 className="text-xl font-semibold">Product List</h3>
                <ul className="mt-3 space-y-2">
                  {data.map((product: any) => (
                    <li
                      key={product._id}
                      className="p-3 border rounded shadow-sm"
                    >
                      {product.name} - ${product.price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedSection === "orders" && (
              <div>
                <h3 className="text-xl font-semibold">Order List</h3>
                <ul className="mt-3 space-y-2">
                  {data.map((order: any) => (
                    <li key={order.id} className="p-3 border rounded shadow-sm">
                      Order #{order.id} - {order.status}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedSection === "clients" && (
              <div>
                <h3 className="text-xl font-semibold">Client List</h3>
                <ul className="mt-3 space-y-2">
                  {data.map((client: any) => (
                    <li
                      key={client.id}
                      className="p-3 border rounded shadow-sm"
                    >
                      {client.name} - {client.email}
                    </li>
                  ))}
                </ul>
              </div>
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
