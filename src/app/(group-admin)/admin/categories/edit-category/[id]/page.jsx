"use client";
import React, { use, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance, titleToSlug } from "@/app/library/helper";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import { useParams } from "next/navigation";

const EditCategory = () => {
  const param = useParams();
  const id = param.id;
  console.log(id);
  const nameRef = useRef();
  const slugRef = useRef();
  const [message, setMessage] = useState(false);

  const nameHandler = async () => {
    // Convert the name to a slug
    slugRef.current.value = titleToSlug(nameRef.current.value);

    axiosInstance
      .get(`/category/get-category/${nameRef.current.value}`)
      .then((response) => {
        if (response.data.flag === 1) {
          setMessage(true);
        } else setMessage(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/category/${id}`).then((response) => {
        if (response.data.flag === 1) {
          nameRef.current.value = response.data.category.name;
          slugRef.current.value = response.data.category.slug;
        }
      });
    }
  }, []);

  const editCategoryHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const slug = slugRef.current.value;

    if (!name || !slug) {
      toast.error("Please fill all the fields.");
      return;
    }

    const response = await axiosInstance.patch(`/category/edit/${id}`, {
      name,
      slug,
    });
    if (response.data.flag == 1) {
      toast.success(response.data.message);
    }
  };

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Categories", "Edit"]}
        title={"Back to view"}
        url={"/admin/categories"}
        trashUrl={"/admin/categories/add-category"}
        viewTrash={"/admin/categories/view-trash"}
      />

      <form
        onSubmit={editCategoryHandler}
        className="max-w-full mx-auto shadow mt-8 p-3"
      >
        <h2 className="text-xl font-semibold p-2 text-center">Edit Category</h2>
        <div className="flex gap-4">
          <div className="mb-5 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Category Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              ref={nameRef}
              onChange={nameHandler}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Example: Mobile Phones"
              required=""
            />
            <div>
              <span className="py-2 text-xs ">
                {message && "Category already exists"}
              </span>
            </div>
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Category Slug
            </label>
            <input
              readOnly={true}
              type="slug"
              name="slug"
              id="slug"
              ref={slugRef}
              className="  text-gray-900 text-sm rounded-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 border border-gray-300  outline-none focus:ring-0 bg-gray-300"
              required=""
              placeholder="Example: mobile-phones"
            />
          </div>
        </div>
        <div className="text-end">
          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ${
              message && "opacity-[0.3] cursor-not-allowed"
            } `}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
