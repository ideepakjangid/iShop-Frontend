"use client";
import React, { useState } from "react";
import { axiosInstance } from "@/app/library/helper";
import toast from "react-hot-toast";

const ToggleStatus = ({ current_status, url }) => {
  const [status, setStatus] = useState(current_status);

  const toggleStatus = () => {
    axiosInstance
      .put(`${url}/${!status}`)
      .then((response) => {
        if (response.data.flag === 1) {
          setStatus(!status);
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <span
        onClick={toggleStatus}
        className={`cursor-pointer px-2 py-1 rounded text-sm ${
          status ? "bg-[#dfffe9] text-green-700" : "bg-[#ffe9e9] text-red-700"
        }`}
      >
        {status ? "Active" : "Inactive"}
      </span>
    </>
  );
};

export default ToggleStatus;
