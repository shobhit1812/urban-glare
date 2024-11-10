/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import SearchBar from "./SearchBar";
import logo from "@/assets/logo.png";
import { CiShoppingCart } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/store";
import { User } from "@/helpers/constants/user";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/redux/slices/user.slice";
import { BASE_URL } from "@/helpers/constants/server_url";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface UserComponentLink {
  title: string;
  href: string;
}

interface AdminComponentLink {
  title: string;
  href: string;
}

const userComponents: UserComponentLink[] = [
  { title: "Orders", href: "/orders" },
  { title: "Wishlist", href: "/wishlist" },
  { title: "Customer Service", href: "/customer-service" },
  { title: "Settings", href: "/setting" },
];

const adminComponents: AdminComponentLink[] = [
  { title: "Dashboard", href: "/admin-dashboard" },
  { title: "Create Product", href: "/create-product" },
];

const Navbar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const user: User | null = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/auth/logout`, null, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      dispatch(removeUser({}));
      navigate("/");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="px-6 py-3 md:py-3">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-2xl mx-auto">
        <div className="mr-4 md:mr-8 md:self-start">
          <Link to="/">
            <img src={logo} alt="logo" className="w-28 h-16" />
          </Link>
        </div>

        <SearchBar />

        <div className="flex flex-col items-center mx-4 md:mx-6">
          <p className="text-xs hidden md:block mr-4 md:mr-6">
            Hello, {user ? user?.fullName : "sign in"}
          </p>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium text-sm md:text-base hover:underline">
                  Account & Lists
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 rounded-md shadow-md">
                  <ul className="w-36 gap-2 flex flex-col">
                    {/* if user is logged in than don't show sign in */}
                    {!user?.fullName && (
                      <li>
                        <Link
                          to="/auth/login"
                          className="text-gray-800 hover:underline"
                        >
                          Sign in
                        </Link>
                      </li>
                    )}

                    {user
                      ? (user?.isAdmin ? adminComponents : userComponents).map(
                          (component) => (
                            <li key={component.title}>
                              <Link
                                to={component.href}
                                className="text-gray-800 hover:underline"
                              >
                                {component.title}
                              </Link>
                            </li>
                          )
                        )
                      : userComponents.map((component) => (
                          <li key={component.title}>
                            <a
                              href={component.href}
                              className="text-gray-800 hover:underline"
                            >
                              {component.title}
                            </a>
                          </li>
                        ))}
                    {user && (
                      <li className="mt-2">
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={handleLogout}
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="flex justify-center items-center">
                              <ThreeDots
                                color="#ffffff"
                                height={24}
                                width={24}
                              />
                            </div>
                          ) : (
                            "Logout"
                          )}
                        </Button>
                      </li>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {!user?.isAdmin && (
          <div className="flex items-center relative mt-3 md:mt-0 cursor-pointer">
            <CiShoppingCart size={30} className="mr-1 relative" />
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-xs text-white rounded-full px-2 py-0.5">
              0
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
