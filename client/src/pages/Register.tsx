/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { Form } from "@/components/ui/form";

import axios from "axios";
import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { BASE_URL } from "@/helpers/constants/server_url";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(2, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterData) => {
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/auth/register`,
        { ...data },
        { withCredentials: true }
      );
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Form
        className="w-full max-w-sm p-6 bg-white shadow-md rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center text-2xl font-semibold mb-4">Register</h2>

        <div className="mb-4">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input id="username" {...register("username")} />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            {...register("password")}
          />
          <Button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-2"
          >
            {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </Button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600 transition-all"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center">
              <ThreeDots color="#ffffff" height={24} width={24} />
            </div>
          ) : (
            "Register"
          )}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already registered?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
