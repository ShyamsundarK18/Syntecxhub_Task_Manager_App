import React, { useState } from "react";
import { FaEyeSlash, FaPeopleGroup } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axioInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const { loading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);

    // Login API call
    try {
      dispatch(signInStart());

      const response = await axiosInstance.post(
        "/auth/sign-in",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      // console.log(response.data)

      if (response.data.role === "admin") {
        dispatch(signInSuccess(response.data));
        navigate("/admin/dashboard");
      } else {
        dispatch(signInSuccess(response.data));
        navigate("/user/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        dispatch(signInFailure(error.response.data.message));
      } else {
        setError("Something went wrong. Please try again!");
        dispatch(signInFailure("Something went wrong. Please try again!"));
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Branding */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 text-white flex-col justify-center items-center p-12">
        <div className="text-center space-y-6">
          <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-md w-[110px] ml-[140px]">
            <FaPeopleGroup className="text-6xl" />
          </div>

          <h1 className="text-4xl font-bold">TaskSphere</h1>
          <p className="text-lg text-white/80 max-w-md">
            Organize tasks. Track progress. Deliver results on time.
          </p>
        </div>
      </div>

      {/* Right Side Login Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-950 px-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl font-semibold text-white text-center mb-8">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300">Password</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition duration-300"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
