import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
