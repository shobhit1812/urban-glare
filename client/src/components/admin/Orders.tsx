import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import { User } from "@/helpers/constants/User";

const Orders = () => {
  const navigate = useNavigate();

  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Redirect if user is not admin
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  return <div>Orders</div>;
};

export default Orders;
