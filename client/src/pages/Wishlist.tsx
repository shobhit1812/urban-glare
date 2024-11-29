import axios from "axios";
import User from "@/interfaces/user.interface";
import Product from "@/interfaces/product.interface";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/helpers/constants/server_url";

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (user?._id) {
          const response = await axios.get(
            `${BASE_URL}/favorite/get-all-favorites`,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
              withCredentials: true,
            }
          );
          setWishlist(response?.data?.favorites);
          setTotalItems(response?.data?.total);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleRemove = async (productId: string) => {
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
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== productId)
      );
      setTotalItems((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Your Wishlist - {totalItems}
      </h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.productImages[0]}
                alt={item.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 truncate">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600">{item.brand}</p>
                <div className="text-yellow-500 my-2 flex">
                  {Array.from({ length: item.rating }, (_, i) => (
                    <AiFillStar key={i} size={20} />
                  ))}
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  ₹ {item.price.toLocaleString("en-IN")}
                </p>
                <Button
                  variant="destructive"
                  className="mt-4 w-full"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-xl font-medium">
            Your wishlist is empty. Start exploring!
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
