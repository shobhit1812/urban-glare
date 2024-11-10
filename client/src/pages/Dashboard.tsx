import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { User } from "@/helpers/constants/user";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Redirect if user is not admin
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Redirect to 'products' as the default tab if we're at '/dashboard'
    if (location.pathname === "/admin-dashboard") {
      navigate("/admin-dashboard/products");
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto min-h-screen">
      <aside className="top-16 p-5 w-full lg:w-[180px] lg:min-h-screen bg-gray-50 shadow-lg lg:flex lg:flex-col lg:justify-start">
        <ul className="space-y-4 p-2 font-bold text-lg">
          <li>
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white p-2 rounded-lg block text-center lg:text-left"
                  : "hover:text-gray-600 p-2 block text-center lg:text-left"
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white p-2 rounded-lg block text-center lg:text-left"
                  : "hover:text-gray-600 p-2 block text-center lg:text-left"
              }
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="clients"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white p-2 rounded-lg block text-center lg:text-left"
                  : "hover:text-gray-600 p-2 block text-center lg:text-left"
              }
            >
              Clients
            </NavLink>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-4 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
