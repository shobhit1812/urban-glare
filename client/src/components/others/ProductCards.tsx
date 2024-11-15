import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Product } from "@/helpers/constants/product";
import { BASE_URL } from "@/helpers/constants/server_url";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/favorite/get-all-favorites`,
          {
            withCredentials: true,
          }
        );
        setIsFavorite(response.data.includes(product._id));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [product._id]);

  const toggleFavorite = async () => {
    try {
      await axios.post(
        `${BASE_URL}/favorite/toggle-favorites`,
        { productId: product._id },
        { withCredentials: true }
      );
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
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
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
        >
          {isFavorite ? (
            <AiFillHeart className="text-red-500" size={24} />
          ) : (
            <AiOutlineHeart size={24} />
          )}
        </button>
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
