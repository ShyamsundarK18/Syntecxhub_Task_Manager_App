import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { FaEyeSlash, FaPeopleGroup } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector";
import axiosInstance from "../../utils/axioInstance";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [showAdminInviteToken, setShowAdminInviteToken] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter the name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);

    // SignUp API call
    try {
      // Upload profile picture if present
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post("/auth/sign-up", {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminJoinCode: adminInviteToken,
      });

      if (response.data) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 text-white flex-col justify-center items-center p-12">
        <div className="text-center space-y-6">
          <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-md w-[110px] ml-[130px]">
            <FaPeopleGroup className="text-6xl" />
          </div>

          <h1 className="text-4xl font-bold">Join Task Flow</h1>
          <p className="text-lg text-white/80 max-w-md">
            Create your account and start managing your task.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-950 px-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl font-semibold text-white text-center mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Photo */}
            <div className="flex justify-center">
              <ProfilePhotoSelector
                image={profilePic}
                setImage={setProfilePic}
              />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <input
              type="text"
              placeholder="Admin Invite Token"
              value={adminInviteToken}
              onChange={(e) => setAdminInviteToken(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
