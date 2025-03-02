"use client";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance, titleToSlug } from "@/app/library/helper";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import { FaRedo, FaPlus } from "react-icons/fa";
const AddColor = () => {
  const nameRef = useRef();
  const slugRef = useRef();
  const hxcodeRef = useRef();
  const namchooseColorRef = useRef();
  const [message, setMessage] = useState(false);

  const hexCodeHandler = ()=>{
    hxcodeRef.current.value = namchooseColorRef.current.value
  }

    const nameHandler = async () => {
      slugRef.current.value = titleToSlug(nameRef.current.value)
  
      axiosInstance
        .get(`/color/get-color/${nameRef.current.value}`)
        .then((response) => {
          console.log(response.data)
          if (response.data.flag === 1) {
            setMessage(true);
          } else setMessage(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

  const addColorHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const hxcode = hxcodeRef.current.value.trim();
    const slug = slugRef.current.value;

    if (!name || !hxcode) {
      toast.error("Please fill all the fields.");
      return;
    }

    const response = await axiosInstance.post("/color/create", {
      name,
      slug,
      hxcode,
    });
    if (response.data.flag == 1) {
      toast.success(response.data.message);
      e.target.reset();
    }
  };

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Color", "Add"]}
        title={"Back to view"}
        url={"/admin/colors"}
        trashUrl={"/admin/colors/add-color"}
        viewTrash={"/admin/colors/view-trash"}
      />

      <form
        onSubmit={addColorHandler}
        className="max-w-full mx-auto shadow mt-8 p-3"
      >
        <h2 className="text-xl font-semibold p-2 text-center">Add Color</h2>
        <div className="flex gap-4">
          <div className="mb-5 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Color Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              ref={nameRef}
              onChange={nameHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Example: Red"
              required=""
            />
            <div>
              <span className="py-2 text-xs ">
                {message && "Color already exists"}
              </span>
            </div>
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Color Slug
            </label>
            <input
            readOnly
              type="name"
              name="slug"
              id="name"
              ref={slugRef}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="chooseColor"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Choose Color
            </label>
            <input
              type="color"
              name="chooseColor"
              id="chooseColor"
              ref={namchooseColorRef}
              onChange={hexCodeHandler}
              className="bg-gray-50 border cursor-pointer  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="hxcode"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              HEX Code
            </label>
            <input
            readOnly={true}
              type="hxcode"
              name="hxcode"
              id="hxcode"
              ref={hxcodeRef}
              className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
              placeholder="Example: #FF0000"
            />
          </div>
        </div>
        <div className="text-end">
          <button
            type="button"
            onClick={(e) => {
              e.target.form.reset();
              setMessage(false);
            }}
            className="focus:outline-none  text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
          >
            <FaRedo className="inline-block mr-2" />
            Reset
          </button>
          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ${
              message && "opacity-[0.3] cursor-not-allowed"
            } `}
          >
            <FaPlus className={`inline-block mr-2`} />
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddColor;
