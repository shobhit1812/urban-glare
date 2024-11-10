import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/helpers/constants/User";
import { RootState } from "@/redux/store/store";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/helpers/constants/server_url";

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
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
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/product/get-all-products`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setProducts(response.data.products);
      } catch (error: any) {
        setError("Failed to load products.");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user?.token]);

  return (
    <div>
      {loading ? (
        <p>Loading Products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 sm:p-4">Image</th>
                <th className="p-2 sm:p-4">Product ID</th>
                <th className="p-2 sm:p-4">Name</th>
                <th className="p-2 sm:p-4">Price</th>
                <th className="p-2 sm:p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product?._id} className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-4">
                    <img
                      src={product.productImages[0]}
                      alt={product.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                    />
                  </td>
                  <td className="p-2 sm:p-4">{product._id}</td>
                  <td className="p-2 sm:p-4">{product.name}</td>
                  <td className="p-2 sm:p-4">${product.price}</td>
                  <td className="p-2 sm:p-4 space-x-2">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-xs sm:text-sm">
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="text-xs sm:text-sm"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available for products.</p>
      )}
    </div>
  );
};

export default Products;
