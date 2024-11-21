import axios from "axios";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { IoSearchSharp } from "react-icons/io5";
import { BASE_URL } from "@/helpers/constants/server_url";
import { addFilteredProduct } from "@/store/slices/filteredProducts.slice";

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");

  const dispatch = useDispatch();

  const fetchFilteredProducts = async (searchText: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/product/get-filtered-products`,
        {
          params: { searchText },
          withCredentials: true,
        }
      );
      const filteredData = response.data.products;
      dispatch(addFilteredProduct(filteredData));
    } catch (error: unknown) {
      console.log("Cannot fetch data: ", error);
    }
  };

  return (
    <div className="flex items-center w-full md:w-1/2 lg:w-2/3 bg-white rounded-md overflow-hidden mt-3 md:mt-0">
      <Input
        type="text"
        id="search-text"
        value={searchText}
        className="flex-grow px-4 py-2 outline-none"
        placeholder="Search Urban Glare"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        className="p-2"
        onClick={() => {
          if (searchText === "") {
            alert("write something");
          } else {
            fetchFilteredProducts(searchText);
            setSearchText("");
          }
        }}
      >
        <IoSearchSharp size={24} />
      </button>
    </div>
  );
};

export default SearchBar;
