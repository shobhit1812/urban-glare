import { Input } from "@/components/ui/input";
import { IoSearchSharp } from "react-icons/io5";

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center w-full md:w-1/2 lg:w-2/3 bg-white rounded-md overflow-hidden mt-3 md:mt-0">
      <Input
        className="flex-grow px-4 py-2 outline-none"
        placeholder="Search Urban Glare"
      />
      <button className="p-2">
        <IoSearchSharp size={24} />
      </button>
    </div>
  );
};

export default SearchBar;
