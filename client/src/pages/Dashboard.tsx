import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { User } from "@/helpers/constants/User";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Redirect if user is not admin
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex max-w-screen-2xl mx-auto min-h-screen">
      <aside className="w-full sm:w-1/4 lg:w-1/6 xl:w-1/8 p-4 mr-4">
        <ul className="space-y-3 p-2">
          <li>
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white p-2 rounded-lg"
                  : "hover:text-gray-300 p-2"
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
                  ? "bg-blue-500 text-white p-2 rounded-lg"
                  : "hover:text-gray-300 p-2"
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
                  ? "bg-blue-500 text-white p-2 rounded-lg"
                  : "hover:text-gray-300 p-2"
              }
            >
              Clients
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <div className="flex-1 p-6 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
