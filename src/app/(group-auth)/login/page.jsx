"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { axiosInstance } from "../../library/helper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/reducers/User";
import { FaAngleLeft, FaLock, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { dbToCart } from "@/redux/reducers/Cart";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const routes = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);
  const [userEmail, setEmail] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const cart = useSelector((store) => store.cart);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleInput = (e, index) => {
    if (e.target.value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  const sendOtpHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors({ forgetEmail: "Email is required" });
      return;
    } else if (!emailRegex.test(email)) {
      setErrors({ forgetEmail: "Enter a valid email address" });
      return;
    }
    setEmail(email);

    setLoading(true);
    axiosInstance
      .post("/user/send-otp", { email: email })
      .then((response) => {
        if (response.data.flag == 1) {
          setLoading(false);
          setOtp(response.data.otp);
          setActiveTab("verification");
        } else {
          setLoading(false);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const checkOtpHandler = (e) => {
    e.preventDefault();
    const inputValue = inputRefs.map((ref, index) => ref.current.value);
    const otpValue = inputValue.join("");
    if (otp != otpValue) {
      return toast.error("Otp does not match.");
    }
    setActiveTab("setPassword");
  };

  const setPasswordHandler = (e) => {
    e.preventDefault();
  
    setLoading(true);
    const data = {
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };
    if (data.password != data.confirmPassword) {
      setErrors({newPassword:"Password does not match"})
      return;
    }
    axiosInstance
      .post("/user/set-forgotton-password", {
        email: userEmail,
        password: data.password,
      })
      .then((response) => {
        if (response.data.flag == 1) {
          setLoading(false);
          toast.success("Password changed successfully.");
          setActiveTab("login");
        } else {
          toast.error(response.data.message);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail(formData.email);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      axiosInstance.post("/user/login", formData).then((response) => {
        if (response.data.flag == 1) {
         
          let final_total = 0;
          let original_total = 0;
          const cartItems = response.data.user.cart.map((item) => {
            original_total += item.quantity * item.product_id.original_price;
            final_total += item.quantity * item.product_id.discounted_price;
            return {
              user_id: response.data.user._id,
              product_id: item.product_id._id,
              color_id: item.color_id,
              quantity: item.quantity,
            };
          });
          dispatch(
            dbToCart({
              items: cartItems,
              original_total: original_total,
              final_total: final_total,
            })
          ); toast.success("User login Successfully.");
          setLoading(false);
          dispatch(
            login({ user: response.data.user, token: response.data.token })
          );
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          routes.push("/");
        } else {
          toast.error(response.data.message);
          setLoading(false);
        }
      });
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 min-h-screen">
      
      {activeTab == "login" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        >
          <div className="w-full bg-white rounded-2xl shadow-xl dark:bg-gray-800 p-8 sm:max-w-md transition-all duration-300 hover:shadow-2xl">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  Sign in to continue to your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="you@example.com"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="••••••••"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <ClipLoader size={20} color="#ffffff" />
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setActiveTab("forgot")}
                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                  >
                    Forgot Password?
                  </button>
                  <Link
                    href="/register"
                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                  >
                    Create Account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab == "forgot" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
        >
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative">
            <button
              onClick={() => setActiveTab("login")}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 mb-6"
            >
              <FaAngleLeft className="text-lg" />
              Back to Login
            </button>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Reset Password
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your email to receive a reset link
              </p>
            </div>

            <form onSubmit={sendOtpHandler} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.forgetEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.forgetEmail}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <ClipLoader size={20} color="#ffffff" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      )}

      {/* OTP Verification Section */}
      {activeTab == "verification" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
        >
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Verify Your Email
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                We've sent a 4-digit code to your email
              </p>
            </div>

            <form onSubmit={checkOtpHandler} className="space-y-6">
              <div className="flex justify-center gap-3">
                {inputRefs.map((ref, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={ref}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    className="w-16 h-16 text-3xl text-center rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
              >
                Verify Code
              </button>

              <p className="text-center text-gray-500 dark:text-gray-400">
                Didn't receive code?{" "}
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
                >
                  Resend Code
                </button>
              </p>
            </form>
          </div>
        </motion.div>
      )}

      {/* Set Password Section - Improved Design */}
      {activeTab == "setPassword" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
        >
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Set New Password
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Create a strong, secure password
              </p>
            </div>

            <form onSubmit={setPasswordHandler} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
              >
                Update Password
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default LoginPage;
