import { useState } from "react";
import { Product } from "@/helpers/constants/Product";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface CardProps {
  product: Product;
}

const ProductCards: React.FC<CardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div>
          <img src={product.productImages[0]} alt={product.name} />
          <button onClick={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? (
              <AiFillHeart className="text-red-500" size={24} />
            ) : (
              <AiOutlineHeart size={24} />
            )}
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription>{product.brand}</CardDescription>
        <CardDescription>{product.name}</CardDescription>
      </CardContent>

      <CardFooter>
        <CardDescription>₹ {product.price}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default ProductCards;
