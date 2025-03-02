"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { loginAdmin } from "@/redux/reducers/Admin";
import { axiosInstance } from "@/app/library/helper";
import { motion } from "framer-motion";

const LoginPage = () => {
  const routes = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      axiosInstance.post("/admin/login", formData).then((response) => {
        if (response.data.flag == 1) {
          toast.success("Admin login Successfully.");
          setLoading(false);
          dispatch(loginAdmin({ admin: response.data.admin }));
          localStorage.setItem("admin", JSON.stringify(response.data.admin));
          routes.push("/admin");
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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: -50 }} // Fade in and slide up
          animate={{ opacity: 1, y: 0 }} // Final position
          transition={{ duration: 0.5 }} // Animation duration
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }} // Slide in from the left
                animate={{ opacity: 1, x: 0 }} // Final position
                transition={{ delay: 0.2 }} // Delay for staggered effect
              >
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter email"
                  required=""
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }} // Slide in from the left
                animate={{ opacity: 1, x: 0 }} // Final position
                transition={{ delay: 0.3 }} // Delay for staggered effect
              >
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }} // Slide in from the left
                animate={{ opacity: 1, x: 0 }} // Final position
                transition={{ delay: 0.4 }} // Delay for staggered effect
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start invisible">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }} // Scale up on hover
                whileTap={{ scale: 0.95 }} // Scale down on tap
                type="submit"
                className="w-full text-white bg-blue-700 flex gap-2 items-center justify-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <ClipLoader size={15} loading={loading} />
                <span>Sign in</span>
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoginPage;
