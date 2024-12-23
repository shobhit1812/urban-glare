import axios from "axios";
import User from "@/interfaces/user.interface";
import Product from "@/interfaces/product.interface";
import CustomPagination from "../others/CustomPagination";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "@/helpers/constants/server_url";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

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
            params: { page, limit: 5 },
            withCredentials: true,
          }
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error: unknown) {
        setError("Failed to load products.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user.token, page]);

  const handleDeleteProduct = async (productId: string) => {
    try {
      setLoading(true);

      await axios.delete(`${BASE_URL}/product/delete-product/${productId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.success("Product deleted successfully!", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 5000,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product.", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 5000,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
                        <Link to={`/edit-product/${product?._id}`}>Edit</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        className="text-xs sm:text-sm"
                        onClick={() => handleDeleteProduct(product?._id)}
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

      <div className="flex justify-center mt-6 space-x-4">
        <CustomPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Products;
