"use client";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "@/app/library/helper";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import Select from "react-select";
import { useRouter } from "next/navigation";

const AddAdmin = () => {
  const router = useRouter();

  const addAdminHandler = async (e) => {
    e.preventDefault();
    const data={
      name:e.target.name.value,
      email:e.target.email.value.toLowerCase(),
      contact:e.target.contact.value,
      password:e.target.password.value,
      type:e.target.type.value,
      address:e.target.address.value
    }
    console.log(data)

    const response = await axiosInstance.post("/admin/register", data);
    if (response.data.flag == 1) {
      toast.success(response.data.message);
      router.push("/admin/admin-list");
      e.target.reset();
    }else{
      toast.error(response.data.message)
    }
  };

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Admin-List", "Add"]}
        title={"Back to view"}
        url={"/admin/admin-list"}
        trashUrl={"/admin/admin-list/add-admin"}
        viewTrash={"/admin/admin-list/view-trash"}
      />

      <form
        onSubmit={addAdminHandler}
        className="max-w-full mx-auto shadow mt-8 p-3"
      >
        <h2 className="text-xl font-semibold p-2 text-center">Add Admin</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Snow"
              required=""
            />
          </div>

          <div className="mb-5 w-full">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@gmail.com"
              required=""
            />
          </div>
     
          <div className="mb-5 w-full">
            <label
              htmlFor="contact"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Contact
            </label>
            <input
              type="contact"
              name="contact"
              id="contact"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="xxxxx-xxxxx"
              required=""
            />
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required=""
            />
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="type"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Type
            </label>
            <Select
              name="type"
              placeholder="Select Category"
              options={[
                { value: 1, label: "Super Admin" },
                { value: 2, label: "Sub-Admin" },
                { value: 3, label: "Staff" },
              ]}
            />
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="address"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Address
            </label>
            <input
              type="address"
              name="address"
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required=""
            />
          </div>
        </div>
        <div className="text-end">
          <button
            type="button"
            onClick={(e) => {
              e.target.form.reset();
            }}
            className="focus:outline-none  text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Reset
          </button>
          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
            } `}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
