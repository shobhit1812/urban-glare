import axios from "axios";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { addUser } from "@/redux/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/helpers/constants/server_url";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
        withCredentials: true,
      });
      const { user } = response.data;
      dispatch(addUser(user));
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.response.data;
      setErrors(errorMessage.replace("Internal Server Error: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-6">
      {/* Logo above the sign-in form */}
      <Link to="/">
        <img src={logo} alt="Logo" className="w-36 h-24 mb-4" />
      </Link>

      <div className="w-full max-w-xs bg-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-3">Sign in</h1>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <Label className="font-medium text-sm" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@doe.com"
              required
              className="w-full px-3 py-1.5 border rounded-md"
              autoComplete="email"
            />
          </div>

          <div className="mb-3 relative">
            <Label className="font-medium text-sm" htmlFor="password">
              Password
            </Label>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="At least 8 characters"
              required
              className="w-full px-3 py-1.5 border rounded-md"
              autoComplete="new-password"
            />
            <Button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-2 top-6"
              variant="ghost"
            >
              {isPasswordVisible ? (
                <AiFillEyeInvisible size={18} />
              ) : (
                <AiFillEye size={18} />
              )}
            </Button>
          </div>

          {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}

          <Button
            type="submit"
            className="w-full mt-3 py-2"
            variant="default"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ThreeDots color="#ffffff" height={24} width={24} />
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <p className="text-xs text-center mt-5">
          New User?{" "}
          <Link
            to="/auth/register"
            className="text-blue-600 hover:underline hover:text-orange-600"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
