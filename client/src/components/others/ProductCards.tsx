import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "@/store/store";
import { Product } from "@/helpers/constants/product";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite, fetchFavorites } from "@/store/slices/favorite.slice";
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
  const dispatch: AppDispatch = useDispatch(); // Properly type dispatch
  const { items: favorites } = useSelector(
    (state: RootState) => state.favorite
  );
  const user = useSelector((state: RootState) => state.user); // Get user state

  const isFavorite = favorites.includes(product._id);

  const toggleFavoriteHandler = () => {
    if (user?._id) {
      dispatch(toggleFavorite(product._id));
    }
  };

  useEffect(() => {
    // Fetch favorites only if a user is logged in
    if (user?._id && favorites.length === 0) {
      dispatch(fetchFavorites(user?._id));
    }
  }, [dispatch, user, favorites]);

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
          onClick={toggleFavoriteHandler}
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
