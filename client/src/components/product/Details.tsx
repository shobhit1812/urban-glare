import axios from "axios";
import User from "@/interfaces/user.interface";
import Product from "@/interfaces/product.interface";
import ProductDetailsSkeleton from "@/components/skeleton/ProductDetailsSkeleton";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { BASE_URL } from "@/helpers/constants/server_url";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Details: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { productId } = useParams<{ productId: string }>();

  const user: User = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      return toast.info("Please login to add items to the cart.", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 5000,
        draggable: true,
      });
    }

    setLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/cart/add-to-cart`,
        { userId: user?._id, productId, quantity: 1 },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      navigate("/cart");
    } catch (error: unknown) {
      console.error("Error adding to cart: ", error);
      toast.error("Error adding to cart.", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 5000,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

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
      } catch (error: unknown) {
        console.error("Error fetching product details: ", error);
      }
    };
    fetchProduct();

    // const fetchFavorites = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${BASE_URL}/favorite/get-all-favorites`,
    //       { withCredentials: true }
    //     );
    //     setIsFavorite(response.data.includes(productId));
    //   } catch (error: any) {
    //     console.error("Error fetching favorites:", error.message);
    //   }
    // };
    // fetchFavorites();
  }, [productId]);

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    // try {
    //   await axios.post(
    //     `${BASE_URL}/favorite/toggle-favorites`,
    //     { productId },
    //     { withCredentials: true }
    //   );
    //   setIsFavorite(!isFavorite);
    // } catch (error) {
    //   console.error("Error toggling favorite:", error);
    // }
  };

  if (!product) return <ProductDetailsSkeleton />;

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
                      onClick={() => setEnlargedImage(img)}
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
              {!user?.isAdmin && (
                <button
                  onClick={toggleFavorite}
                  className="bg-white p-2 rounded-full shadow-md"
                >
                  {isFavorite ? (
                    <AiFillHeart className="text-red-500" size={24} />
                  ) : (
                    <AiOutlineHeart size={24} />
                  )}
                </button>
              )}
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
              <Button
                onClick={handleAddToCart}
                className="w-full py-3 rounded-lg text-lg flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <ThreeDots
                    height="30"
                    width="30"
                    color="#ffffff"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                ) : (
                  "Add to Cart"
                )}
              </Button>
            ) : (
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg text-lg">
                <Link to={`/edit-product/${product?._id}`}>Edit Product</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Enlarged Image */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-3xl mx-auto p-4">
            <img
              src={enlargedImage}
              alt="Enlarged product"
              className="max-h-[90vh] object-contain rounded-lg shadow-lg"
            />
            <button
              className="absolute top-0 right-2 text-2xl p-2 rounded-full text-black hover:text-gray-900"
              onClick={() => setEnlargedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
