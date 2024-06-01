import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import SocialLogin from "../Components/SocialLogin";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Login = () => {
  const { logInUser, setLoader } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = location.state?.from?.pathname || "/";
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await logInUser(data.email, data.password);
      navigate(from, { replace: true });
      setLoader(false);
    } catch (error) {
      console.error("Login failed", error);
      setLoader(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen p-28 overflow-hidden"
    >
      <div className="border-2 border-black shadow-xl w-full h-full overflow-hidden py-8 px-20 grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8">
        <div>
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-lg" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full text-xl p-2 rounded-md"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div>
              <label className="block text-lg" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full text-xl p-2 rounded-md"
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div className="text-center">
              <button
                className="border-b-4 border-black rounded-md px-5 py-2 hover:bg-black hover:text-white font-semibold"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-center">Don't have an account? <Link to="/register">Register</Link></p>
          <div className="text-center my-4 space-y-4">
            <p>Or sign in with</p>
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
