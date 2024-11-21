import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "@/components/others/Footer";
import Navbar from "@/components/navbar/Navbar";

import "react-toastify/dist/ReactToastify.css";

const Home: React.FC = () => {
  return (
    <>
      <ToastContainer theme="dark" />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
