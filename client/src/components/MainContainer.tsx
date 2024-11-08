import axios from "axios";
import { useSelector } from "react-redux";
import ProductCards from "./ProductCards";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { Product } from "@/helpers/constants/Product";
import { BASE_URL } from "@/helpers/constants/server_url";

const MainContainer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/product/get-all-products`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  return (
    <div className="container mx-auto p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        <ProductCards key={product._id} product={product} />
      ))}
    </div>
  );
};

export default MainContainer;
