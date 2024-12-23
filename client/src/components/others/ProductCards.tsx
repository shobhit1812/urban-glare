import axios from "axios";
import User from "@/interfaces/user.interface";
import Product from "@/interfaces/product.interface";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "@/helpers/constants/server_url";
import { toggleFavorite } from "@/store/slices/favorites.slice";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface CardProps {
  product: Product;
}

const ProductCards: React.FC<CardProps> = ({ product }) => {
  const user: User = useSelector((state: RootState) => state.user);
  const favorites = useSelector(
    (state: RootState) => state.favorites?.items || []
  );

  // Check if this specific product is in favorites
  const [isFavorite, setIsFavorite] = useState<boolean>(
    favorites.some((fav) => fav._id === product._id)
  );

  useEffect(() => {
    // Update isFavorite whenever the favorites array changes
    setIsFavorite(favorites.some((fav) => fav._id === product._id));
  }, [favorites, product._id]);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = async () => {
    if (user?._id) {
      try {
        const productId = product?._id;
        const response = await axios.post(
          `${BASE_URL}/favorite/toggle-favorites`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            withCredentials: true,
          }
        );
        dispatch(toggleFavorite(product));
        setIsFavorite(response.data?.favorites);
      } catch (error: unknown) {
        console.log("Error while toggling: ", error);
        toast.error("Failed to update favorites", {
          position: "bottom-right",
          theme: "dark",
        });
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

  // Format price for thousands only
  const formattedPrice =
    product.price >= 1000
      ? new Intl.NumberFormat("en-IN").format(product.price)
      : product.price;

  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader className="relative">
        <Link to={`/${product?.name}/${product?.brand}/${product?._id}`}>
          <img
            src={product.productImages[0]}
            alt={product.name}
            className="w-full h-80 object-cover"
          />
        </Link>
        {!user?.isAdmin && (
          <button
            onClick={toggleFavoriteHandler}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
          >
            {isFavorite ? (
              <AiFillHeart className="text-red-500" size={24} />
            ) : (
              <AiOutlineHeart size={24} />
            )}
          </button>
        )}
      </CardHeader>

      <CardContent>
        <CardDescription className="text-lg p-1">
          <Link to={`/${product?.name}/${product?.brand}/${product?._id}`}>
            {" "}
            {product.name}
          </Link>
        </CardDescription>

        <CardDescription className="p-1 flex">
          {Array.from({ length: product.rating }, (_, i) => (
            <AiFillStar key={i} className="text-yellow-500 text-lg" />
          ))}{" "}
        </CardDescription>

        <CardDescription className="text-lg p-1 text-gray-900">
          ₹ {formattedPrice}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ProductCards;
