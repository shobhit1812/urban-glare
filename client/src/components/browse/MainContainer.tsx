import axios from "axios";
import ProductCards from "../ProductCards";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store/store";
import CustomPagination from "../CustomPagination";
import { Product } from "@/helpers/constants/product";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/helpers/constants/server_url";
import { addProduct } from "@/redux/slices/allProducts.slice";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

const MainContainer: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const dispatch = useDispatch();
  const allProducts = useSelector((state: RootState) => state.allProduct);
  const filteredProducts = useSelector(
    (state: RootState) => state.filteredProduct
  );

  const isFiltered = filteredProducts.length > 0;
  const productsToDisplay =
    isFiltered && filteredProducts ? filteredProducts : allProducts ?? [];

  useEffect(() => {
    const fetchProducts = async () => {
      if (isFiltered) return; // Skip fetching if we have filtered products

      setLoading(true);

      try {
        const response = await axios.get(
          `${BASE_URL}/product/get-all-products`,
          {
            params: { page, limit: 9 },
            withCredentials: true,
          }
        );
        const data = response.data.products;
        dispatch(addProduct(data));
        setTotalPages(response.data.totalPages);
      } catch (error: any) {
        console.error("Error while fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, dispatch, isFiltered]);

  return (
    <div>
      <div className="container mx-auto p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : productsToDisplay.map((product: Product) => (
              <ProductCards key={product._id} product={product} />
            ))}
      </div>

      {/* Show Pagination Only for All Products */}
      {!isFiltered && (
        <div className="flex justify-center mt-6 space-x-4">
          <CustomPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default MainContainer;
