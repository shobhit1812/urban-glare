import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
