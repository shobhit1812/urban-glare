import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="m-10">
        <div className="p-1">
          <Link to="/auth/login">
            <Button>Login</Button>
          </Link>
        </div>

        <div className="p-1">
          <Link to="/auth/register">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
