import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/others/Footer";
import Navbar from "@/components/navbar/Navbar";
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
