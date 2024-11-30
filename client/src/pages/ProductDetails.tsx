import axios from "axios";
import User from "@/interfaces/user.interface";
import Product from "@/interfaces/product.interface";
import SliderCards from "@/components/others/SliderCards";
import ProductDetailsSkeleton from "@/components/shimmer-effect/ProductDetailsSkeleton";

import { toast } from "react-toastify";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/helpers/constants/server_url";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toggleFavorite } from "@/store/slices/favorites.slice";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { productId } = useParams<{ productId: string }>();

  const dispatch = useDispatch();

  const user: User = useSelector((state: RootState) => state.user);
  const favorites = useSelector(
    (state: RootState) => state.favorites?.items || []
  );

  const [isFavorite, setIsFavorite] = useState(
    favorites.some((fav) => fav._id === product?._id)
  );

  const navigate = useNavigate();

  const formattedPrice = new Intl.NumberFormat("en-IN").format(product?.price);

  // Update useEffect to sync isFavorite with Redux
  useEffect(() => {
    if (product) {
      setIsFavorite(favorites.some((fav) => fav._id === product._id));
    }
  }, [favorites, product]);

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
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
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
        window.scrollTo(0, 0);

        const response = await axios.get(
          `${BASE_URL}/product/get-product/${productId}`,
          {
            withCredentials: true,
          }
        );
        setProduct(response?.data?.product);
      } catch (error: unknown) {
        console.error("Error fetching product details: ", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const toggleFavoriteHandler = async () => {
    if (user?._id) {
      try {
        await axios.post(
          `${BASE_URL}/favorite/toggle-favorites`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            withCredentials: true,
          }
        );
        // Dispatch the toggle action with the full product
        if (product) {
          dispatch(toggleFavorite(product));
        }
      } catch (error: unknown) {
        console.log("Error while toggling: ", error);
      }
    } else {
      toast.error("Please Login!!!", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 5000,
        draggable: true,
      });
    }
  };

  return (
    <>
      {!product ? (
        <ProductDetailsSkeleton />
      ) : (
        <div className="p-4 md:p-8 lg:p-12 max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
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
                    onClick={toggleFavoriteHandler}
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

              <p className="text-gray-700 mb-6">{product.description}</p>

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

          <div className="mt-14">
            <SliderCards />
          </div>
        </div>
      )}

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

export default ProductDetails;
