import axios from "axios";
import User from "@/interfaces/user.interface";
import Product from "@/interfaces/product.interface";
import SliderCards from "@/components/others/SliderCards";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/helpers/constants/server_url";
import { toggleFavorite, setFavorites } from "@/store/slices/favorites.slice";

const Wishlist: React.FC = () => {
  const dispatch = useDispatch();

  const user: User = useSelector((state: RootState) => state.user);
  const wishlist = useSelector((state: RootState) => state.favorites.items);

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

          // Directly set favorites in Redux store
          dispatch(setFavorites(response?.data?.favorites || []));
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [user, dispatch]);

  const handleRemove = async (product: Product) => {
    try {
      await axios.post(
        `${BASE_URL}/favorite/toggle-favorites`,
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
        }
      );

      // Dispatch toggle action with the entire product
      dispatch(toggleFavorite(product));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Your Wishlist - {wishlist.length}
      </h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/${item?.name}/${item?.brand}/${item?._id}`}>
                <img
                  src={item.productImages[0]}
                  alt={item.name}
                  className="w-full h-48 object-contain"
                />
              </Link>

              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 truncate">
                  <Link to={`/${item?.name}/${item?.brand}/${item?._id}`}>
                    {item.name}
                  </Link>
                </h2>
                <p className="text-sm text-gray-600 pb-3">{item.brand}</p>
                <p className="text-lg font-semibold text-gray-900">
                  ₹ {item.price.toLocaleString("en-IN")}
                </p>
                <Button
                  variant="destructive"
                  className="mt-4 w-full"
                  onClick={() => handleRemove(item)}
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

      <div className="mt-14">
        <SliderCards />
      </div>
    </div>
  );
};

export default Wishlist;
