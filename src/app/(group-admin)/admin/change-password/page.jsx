"use client";
import { axiosInstance } from "@/app/library/helper";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Page = () => {
    const router = useRouter();
  const [adminVal, setAdminVal] = useState({});
  const [error, setError] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const addAdminHandler = async (e) => {
    e.preventDefault();

    const validationErrors = formValidation();

    // If there are validation errors, stop here
    if (Object.keys(validationErrors).length > 0) return;
    const response = await axiosInstance.get(
      `/admin/check-admin/${adminVal.email}`
    );

    if (response.data.flag === 0) {
      setError((prevErrors) => ({
        ...prevErrors,
        email: response.data.message,
      }));
      return;
    }

   const result = await axiosInstance.post(`/admin/change-password/${adminVal.email}`, {
      password: adminVal.password,
    });
    if(response.data.flag == 1){
        toast.success("Password changed successfully!")
        router.push('/admin')
    }else{
        toast.error(response.data.message)
    }
  };

  const formValidation = () => {
    let newErrors = {}; // Store all errors first, then update state once

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!adminVal.email || adminVal.email.trim() === "") {
      newErrors.email = "Admin Email is required!";
    } else if (!emailRegex.test(adminVal.email)) {
      newErrors.email = "Enter a valid email!";
    }

    // Password Validation
    if (!adminVal.password || adminVal.password.trim() === "") {
      newErrors.password = "Password is required!";
    }

    // Confirm Password Validation
    if (!adminVal.confirm_password || adminVal.confirm_password.trim() === "") {
      newErrors.confirm_password = "Confirm Password is required!";
    } else if (adminVal.password !== adminVal.confirm_password) {
      newErrors.confirm_password = "Passwords do not match!";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
    }

    return newErrors; // Return errors to check if form is valid
  };

  const updateValueHandler = (e) => {
    setAdminVal({ ...adminVal, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="mt-8 px-5">
      <div className="flex justify-between items-center my-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            {["Dashboard", "Change Password"].map((paths, index) => {
              return (
                <li key={index} className="inline-flex items-center">
                  <a
                    href="#"
                    className={`inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white ${
                      index == ["Dashboard", "Change password"].length - 1 &&
                      "text-blue-600"
                    }`}
                  >
                    {index == 0 ? (
                      <svg
                        className="w-3 h-3 me-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                      </svg>
                    ) : (
                      <svg
                        className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    )}
                    {paths}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
      <form
        onSubmit={addAdminHandler}
        className="max-w-full mx-auto shadow mt-8 p-3"
      >
        <h2 className="text-xl font-semibold p-2 mb-4 text-center">
          Change Admin Password
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5 w-full col-span-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              onChange={updateValueHandler}
              id="email"
              className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="example@example.com"
              required
            />
            <div className="text-red-500 text-[12px]">{error.email}</div>
          </div>

          <div className="mb-5 w-full">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              New Password
            </label>
            <div className="flex items-center justify-between w-full p-2.5 border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus-within:ring-blue-500 dark:focus-within:border-blue-500">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={updateValueHandler}
                id="password"
                placeholder="Enter password"
                className="flex-1 bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            <div className="text-red-600 text-[12px]">{error.password}</div>
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Confirm Password
            </label>
            <div className="flex items-center justify-between w-full p-2.5 border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus-within:ring-blue-500 dark:focus-within:border-blue-500">
              <input
                type={showPassword ? "text" : "password"}
                name="confirm_password"
                onChange={updateValueHandler}
                id="confirm_password"
                placeholder="Enter password"
                className="flex-1 bg-transparent focus:outline-none dark:placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            <div className="text-red-500 text-[12px]">
              {error.confirm_password}
            </div>
          </div>
        </div>
        <div className="text-end">
          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
            } `}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
