"use client";
import { axiosInstance } from "@/app/library/helper";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

const ImageGallery = ({ productImages, id }) => {
  const [clicked, setClicked] = useState(false);
  const [otherImages, setOtherImages] = useState(productImages || []) ;

  const removeHandler = async (image) => {
    const data={
      image:image
    }
    const response = await axiosInstance.put(
      `/product/removeOtherPhoto/${id}`,
      data
    );
    if (response.data.flag == 1) {
      toast.success("Image deleted...");
      setOtherImages(response.data.other_images);
    } else {
      toast.error("Somethig went wrong...");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // console.log(otherImages)

    const files = e.target.image.files;

    const formData = new FormData();
    // formData.append("other_images",e.target.image.files);
    Array.from(files).forEach((file) => {
      formData.append("other_images", file);
    });

    axiosInstance
      .post(`/product/upload-otherImages/${id}`, formData)
      .then((response) => {
        if (response.data.flag == 1) {
          Array.from(files).forEach((file) => {
            // setOtherImages([...otherImages, file.name]);
            setOtherImages(response.data.other_images)
          });

          toast.success("Images Uploaded..");
        }
      })
      .catch((err) => {
        console.log("Error in uploading images:", err.message);
        toast.error("Unable to upload Images...");
      });
  };
  return (
    <>
      {/* Backdrop */}
      {clicked && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
          onClick={() => setClicked(false)}
        ></div>
      )}

      {/* Gallery Modal */}
      <div
        className={`fixed z-50 w-full max-w-4xl left-1/2 top-1/2 transform ${
          clicked ? "translate-x-[-50%] translate-y-[-50%]" : "hidden"
        } bg-white shadow-lg rounded-lg p-6 overflow-y-auto max-h-[90vh]`}
      >
        {/* Close Button */}
        <FaTimes
          onClick={() => setClicked(false)}
          className="cursor-pointer absolute text-xl border bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 rounded-full p-1 top-4 right-4"
        />

        {/* Title */}
        <h1 className="text-xl font-bold text-center mb-6">
          Images of Product
        </h1>

        {/* Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {otherImages.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-sm">
              <img
                className="h-auto w-full object-cover"
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/other-images/products/${image}`}
                alt={`Product Image ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeHandler(image)}
                className=" w-full  text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-b-lg text-sm px-4 py-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="mt-6 flex flex-col border rounded-lg border-gray-300 p-4 bg-gray-50">
          <label htmlFor="inputFiles" className="font-medium mb-2">
            Upload Files
          </label>
          <div>
            <form
              onSubmit={submitHandler}
              className="flex justify-between items-center"
            >
              <input
                type="file"
                className="border px-2 py-1 rounded-md"
                id="image"
                name="image"
                multiple
              />
              <button
                type="submit"
                className="ml-4 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Gallery Icon */}
      <GrGallery
        onClick={() => setClicked(true)}
        className="cursor-pointer text-2xl text-gray-700 hover:text-gray-900"
      />
    </>
  );
};

export default ImageGallery;
