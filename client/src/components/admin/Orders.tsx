import User from "@/interfaces/user.interface";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";

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
