"use client";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance, titleToSlug } from "@/app/library/helper";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import { FaRedo, FaPlus } from "react-icons/fa";
import Select from "react-select";
import ImageUploader from "@/components/admin/ImageUploader";
import { useRouter } from "next/navigation";

const AddAccessory = () => {
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const router = useRouter();

  const getData = async () => {
    const productsData = await axiosInstance.get("/product");
    setProducts(productsData.data.products);
  };

  const nameRef = useRef();
  const slugRef = useRef();
  const originalPriceRef = useRef();
  const discountedPriceRef = useRef();
  const discountPercentRef = useRef();
  const [message, setMessage] = useState(false);
  const priceHandler = () => {
    const originalPrice = originalPriceRef.current.value;
    const discountedPrice = discountedPriceRef.current.value;

    if (originalPrice === 0) return;

    const discountPercentValue =
      ((originalPrice - discountedPrice) * 100) / originalPrice;
    discountPercentRef.current.value = `${Math.round(discountPercentValue)}%`;
  };

  const nameHandler = async () => {
    // Convert the name to a slug
    slugRef.current.value = titleToSlug(nameRef.current.value);

    axiosInstance
      .get(`/accessory/get-accessory/${nameRef.current.value}`)
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

  const addAccessoryHandler = async (e) => {
    e.preventDefault();



    // if (!name || !slug) {
    //   toast.error("Please fill all the fields.");
    //   return;
    // }
console.log("Hiii")

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("slug", e.target.slug.value);
    formData.append("product", e.target.product.value);
    formData.append("originalPrice", e.target.originalPrice.value);
    formData.append("discountedPrice", e.target.discountedPrice.value);
    formData.append("discountPercent", e.target.discountPercent.value);
    formData.append("image", imageFiles);



    const response = await axiosInstance.post("/accessory/create", formData);
    if (response.data.flag == 1) {
      toast.success(response.data.message);
      router.push("/admin/accessory");
      e.target.reset();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Products", "Add"]}
        title={"Back to view"}
        url={"/admin/products"}
        trashUrl={"/admin/products/add-product"}
        viewTrash={"/admin/products/view-trash"}
      />

      <form
        onSubmit={addAccessoryHandler}
        className="max-w-full mx-auto shadow mt-8 p-3"
      >
        <h2 className="text-xl font-semibold p-2 text-center">Add Accessory</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Accessory Name
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
                {message && "Accessory already exists"}
              </span>
            </div>
          </div>

          <div className="mb-5 w-full">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Accessory Slug
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
          <div className="mb-5 w-full">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Product
            </label>
            <Select
              name="product"
              placeholder="Select Category"
              options={products.map((product) => ({
                value: product._id,
                label: product.name,
              }))}
            />
          </div>
          <div className="mb-5 w-full grid grid-cols-3 col-span-2 gap-3">
            <div>
              <label
                htmlFor="originalPrice"
                className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
              >
                Original Price
              </label>
              <input
                type="number"
                name="originalPrice"
                id="originalPrice"
                ref={originalPriceRef}
                onChange={priceHandler}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Example: 5000"
                required={true}
              />
            </div>
            <div>
              <label
                htmlFor="discountedPrice"
                className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
              >
                Discounted Price
              </label>
              <input
                type="number"
                name="discountedPrice"
                id="discountedPrice"
                onChange={priceHandler}
                ref={discountedPriceRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Example: 4500"
                required={true}
              />
            </div>
            <div>
              <label
                htmlFor="discountPercent"
                className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
              >
                Discount Percent
              </label>
              <input
                type="text"
                name="discountPercent"
                id="discountPercent"
                ref={discountPercentRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Example: 12%"
                required={true}
              />
            </div>
          </div>
          <div className="mb-5 w-full">
            {/* <FilePondImageUploader /> */}
            <label
              htmlFor="name"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Upload Image
            </label>
            <ImageUploader setImageFiles={setImageFiles} setImageUrl={setImage} imageUrl={image} />
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

export default AddAccessory;
