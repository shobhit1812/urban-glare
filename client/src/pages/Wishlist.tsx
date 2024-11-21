import axios from "axios";
import Product from "@/interfaces/product.interface";

import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/helpers/constants/server_url";

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/favorite/get-all-favorites`,
        { withCredentials: true }
      );
      setWishlist(response.data.favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await axios.post(
        `${BASE_URL}/favorite/toggle-favorites`,
        { productId },
        { withCredentials: true }
      );
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      <div className="space-y-4">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4"
          >
            <img
              src={item.productImages[0]}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.brand}</p>
              <div className="text-yellow-500 my-2 flex">
                {Array.from({ length: item.rating }, (_, i) => (
                  <AiFillStar key={i} size={20} />
                ))}
              </div>
              <p className="text-lg font-semibold text-gray-900">
                ₹ {item.price.toLocaleString("en-IN")}
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleRemove(item._id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
