import axios from "axios";
import ProductCards from "../ProductCards";
import { useEffect, useState } from "react";
import CustomPagination from "../CustomPagination";
import { Product } from "@/helpers/constants/product";
import { BASE_URL } from "@/helpers/constants/server_url";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

const MainContainer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${BASE_URL}/product/get-all-products`,
          {
            params: { page, limit: 9 },
            withCredentials: true,
          }
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error: any) {
        console.error("Error while fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div>
      <div className="container mx-auto p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductCards key={product._id} product={product} />
            ))}
      </div>

      {/* Use Custom Pagination Component */}
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

export default MainContainer;
