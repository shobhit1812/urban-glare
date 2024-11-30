import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import axios from "axios";
import Product from "@/interfaces/product.interface";
import LoadingSpinner from "@/components/shimmer-effect/LoadingSpinner";
import ProductCardSkeleton from "@/components/shimmer-effect/ProductCardSkeleton";

import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BASE_URL } from "@/helpers/constants/server_url";
import { Link } from "react-router-dom";

const SliderCards: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/product/get-all-products`,
          {
            params: { limit: 8 },
            withCredentials: true,
          }
        );
        const data = response.data?.products;
        const product = data.reverse();
        setProducts(product || []);
      } catch (error: unknown) {
        console.error("Error While Fetching Products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="slider-container">
          <h1 className="text-2xl font-semibold mb-8 text-gray-600">
            Explore More Products
          </h1>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            pagination={{ clickable: true }}
            navigation
            modules={[Navigation]}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="card hover:shadow-lg transition-shadow duration-300">
                  <Link
                    to={`/${product?.name}/${product?.brand}/${product?._id}`}
                  >
                    <img
                      src={product.productImages[1]}
                      alt={product.name}
                      className="w-full h-72 object-contain rounded-t-lg"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500">
                      ₹{new Intl.NumberFormat("en-IN").format(product?.price)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default SliderCards;
