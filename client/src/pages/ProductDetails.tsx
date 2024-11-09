import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "@/helpers/constants/User";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/store";
import { BASE_URL } from "@/helpers/constants/server_url";
import { ProductDetailsProps } from "@/helpers/constants/Product";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null); // New state for lightbox modal

  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/product/get-product/${productId}`,
          {
            withCredentials: true,
          }
        );
        setProduct(response.data.product);
      } catch (error: any) {
        console.error("Error fetching product details:", error.message);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  const formattedPrice = new Intl.NumberFormat("en-IN").format(product.price);

  return (
    <>
      <div className="p-4 md:p-8 lg:p-12 max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section: Product Carousel */}
          <div className="flex-1 max-w-screen-lg lg:max-w-lg mx-auto">
            <Carousel className="max-w-md">
              <CarouselContent>
                {product.productImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={img}
                      alt={`${product.name} image ${index + 1}`}
                      className="w-full h-96 md:h-[28rem] lg:h-[32rem] object-contain rounded-lg shadow-md cursor-pointer"
                      onClick={() => setEnlargedImage(img)} // Set enlarged image on click
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Right Section: Product Details */}
          <div className="flex-1 px-4 lg:px-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-3xl font-bold">
                  {product.name}
                </h1>
                <p className="text-gray-600 pt-2 text-sm md:text-base">
                  {product.brand}
                </p>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-white p-2 rounded-full shadow-md"
              >
                {isFavorite ? (
                  <AiFillHeart className="text-red-500" size={24} />
                ) : (
                  <AiOutlineHeart size={24} />
                )}
              </button>
            </div>

            <div className="flex items-center mt-2 mb-4">
              <div className="flex text-yellow-500">
                {Array.from({ length: product.rating }, (_, i) => (
                  <AiFillStar key={i} size={20} />
                ))}
              </div>
            </div>

            <p className="text-3xl font-semibold text-gray-900 mb-4">
              ₹ {formattedPrice}
            </p>

            {/* Product Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Sizes */}
            <div className="mb-4">
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="border px-3 py-1 rounded-lg text-gray-700 text-sm cursor-pointer hover:bg-gray-100"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            {!user?.isAdmin ? (
              <Button className="w-full py-3 rounded-lg text-lg">
                Add to Cart
              </Button>
            ) : (
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg text-lg">
                Edit Product
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Enlarged Image */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
          onClick={() => setEnlargedImage(null)} // Close modal on background click
        >
          <div className="relative max-w-3xl mx-auto p-4">
            <img
              src={enlargedImage}
              alt="Enlarged product"
              className="max-h-[90vh] object-contain rounded-lg shadow-lg"
            />
            <button
              className="absolute top-0 right-2 text-2xl p-2 rounded-full text-black hover:text-gray-900"
              onClick={() => setEnlargedImage(null)} // Close modal on button click
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
