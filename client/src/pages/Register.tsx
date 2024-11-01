import axios from "axios";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { BASE_URL } from "@/helpers/constants/server_url";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/auth/register`,
        {
          fullName,
          email,
          username,
          password,
        },
        { withCredentials: true }
      );
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
      setFullName("");
    }
  };

  return (
    <div>
      <form className="w-full max-w-md m-10" onSubmit={handleRegister}>
        <div className="mb-4">
          <Label className="block text-sm font-bold mb-2" htmlFor="fullName">
            Full Name
          </Label>
          <Input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-md text-[#09090b]"
            required
          />
        </div>

        <div className="mb-4">
          <Label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </Label>
          <Input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-md text-[#09090b]"
            required
          />
        </div>

        <div className="mb-4">
          <Label className="block text-sm font-bold mb-2" htmlFor="username">
            Username
          </Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-md text-[#09090b]"
            required
          />
        </div>

        <div className="mb-4">
          <Label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </Label>
          <Input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-md text-[#09090b]"
            required
          />
          <Button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-9"
          >
            {isPasswordVisible ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full text-[#09090b] mb-4"
          variant="outline"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <ThreeDots color="#09090b" height={24} width={24} />
            </div>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Register;
