"use client";
import React, {useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance, titleToSlug } from "@/app/library/helper";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import { FaRedo, FaPlus } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import Select from "react-select";
import axios from "axios";
import ImageUploader from "@/components/admin/ImageUploader";

const EditProduct = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const param = useParams();
  const id = param.id;
  const nameRef = useRef();
  const slugRef = useRef();
  const originalPriceRef = useRef();
  const discountedPriceRef = useRef();
  const discountPercentRef = useRef();
  const [imageFiles,setImageFiles] = useState();
  const [message, setMessage] = useState(false);
  const [colors, setColors] = useState([]);
  const [colorOption, setColorOptions] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  const nameHandler = async () => {
    // Convert the name to a slug
    slugRef.current.value = titleToSlug(nameRef.current.value);

    // axiosInstance
    //   .get(`/category/get-category/${nameRef.current.value}`)
    //   .then((response) => {
    //     if (response.data.flag === 1) {
    //       setMessage(true);
    //     } else setMessage(false);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };

  const selectCategoryHandler = (options) => {
    // const ids = options.map((option)=> option._id)
    setColors(options);
  };

  const getCategories = async () => {
    const response = await axiosInstance.get("/category");
    setCategories(response.data.categories);

    const colorData = await axiosInstance.get("/color");
    setColorOptions(colorData.data.colors);
  };

  useEffect(() => {
    getCategories();
    
  }, []);

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/product/${id}`).then((response) => {
        console.log("idssss",id)
        if (response.data.flag === 1) {
          setProduct(response.data.product);
          setCurrentCategory({value:response.data.product?.category._id,label:response.data.product?.category.name})
          const c_d = [];
          for (let col of response.data.product.color) {
            c_d.push({ value: col?._id, label: col?.name });
          }
          setColors(c_d);
          nameRef.current.value = response.data.product.name;
          slugRef.current.value = response.data.product.slug;
          originalPriceRef.current.value = response.data.product.original_price;
          discountPercentRef.current.value =
            response.data.product.discount_percent;
          discountedPriceRef.current.value =
            response.data.product.discounted_price;
        }
      });
    }
  }, []);
  const priceHandler = () => {
    const originalPrice = originalPriceRef.current.value;
    const discountedPrice = discountedPriceRef.current.value;
    const discountPercent = discountPercentRef.current.value;

    if (originalPrice === 0) return;

    const discountPercentValue =
      ((originalPrice - discountedPrice) * 100) / originalPrice;
    discountPercentRef.current.value = `${Math.round(discountPercentValue)}%`;
  };

  const editProductHandler = async (e) => {
    e.preventDefault();
    console.log(categories);

    // if (!name || !slug) {
    //   toast.error("Please fill all the fields.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("slug", e.target.slug.value);
    formData.append("category", e.target.category.value);
    formData.append("colors", JSON.stringify(colors.map(color_value => color_value.value)));
    formData.append("originalPrice", e.target.originalPrice.value);
    formData.append("discountedPrice", e.target.discountedPrice.value);
    formData.append("discountPercent", e.target.discountPercent.value);
    formData.append("image", imageFiles);

    const response = await axiosInstance.put(`/product/edit/${id}`, formData);
    if (response.data.flag == 1) {
      toast.success(response.data.message);
      router.push("/admin/products");
      e.target.reset();
    }
  };

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Products", "Edit"]}
        title={"Back to view"}
        url={"/admin/products"}
        trashUrl={"/admin/products/add-product"}
        viewTrash={"/admin/products/view-trash"}
      />

      <form
        onSubmit={editProductHandler}
        className="max-w-full mx-auto shadow mt-8 p-3"
      >
        <h2 className="text-xl font-semibold p-2 text-center">Edit Product</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Product Name
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
                {message && "Product already exists"}
              </span>
            </div>
          </div>

          <div className="mb-5 w-full">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Product Slug
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
              Category
            </label>
            <Select
              name="category"
              placeholder="Select Category"
              options={categories.map((category) => ({
                value: category._id,
                label: category.name,
              }))}
              onChange={(options)=>setCurrentCategory(options)}
              value={currentCategory}
            />
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Color
            </label>
            <Select
              name="colors"
              isMulti
              placeholder="Select Color"
              onChange={(options) => selectCategoryHandler(options)}
              value={colors}
              options={colorOption.map((color) => ({
                value: color._id,
                label: color.name,
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
     {
      !product ? null :      <div className="mb-5 w-full">
      <label
        htmlFor="name"
        className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
      >
        Upload Image
      </label>
      <ImageUploader setImageFiles={setImageFiles} imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/images/products/${product.image}`} />
    </div> 
     }
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
            edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
