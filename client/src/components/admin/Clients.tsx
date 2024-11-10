import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/helpers/constants/user";
import { RootState } from "@/redux/store/store";
import { BASE_URL } from "@/helpers/constants/server_url";

const Clients: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Redirect if user is not admin
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${BASE_URL}/user/get-all-users`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setClients(response.data.users);
      } catch (error: any) {
        setError("Failed to load clients");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [user?.token]);

  return (
    <div>
      {loading ? (
        <p>Loading clients...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : clients.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-left hidden sm:table">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4">Client ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{client._id}</td>
                  <td className="p-4">{client.fullName}</td>
                  <td className="p-4">{client.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile-friendly view */}
          <div className="space-y-4 sm:hidden">
            {clients.map((client) => (
              <div
                key={client._id}
                className="p-4 border border-gray-300 rounded-lg bg-white"
              >
                <p>
                  <span className="font-bold">Client ID:</span> {client._id}
                </p>
                <p>
                  <span className="font-bold">Name:</span> {client.fullName}
                </p>
                <p>
                  <span className="font-bold">Email:</span> {client.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No data available for clients.</p>
      )}
    </div>
  );
};

export default Clients;
