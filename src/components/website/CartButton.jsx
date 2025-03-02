"use client";
import { axiosInstance } from "@/app/library/helper";
import { addToCart } from "@/redux/reducers/Cart";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const CartButton = ({ colors, product_id, prices }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [productView, setProductView] = useState("grid")
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const searchParams = useSearchParams();

  useEffect(
    ()=>{
      const view_val = searchParams.get("view");
      if(view_val){
        setProductView(view_val)
      }
    },[searchParams]
  )

  const handleColorIdSelect = (color_id) => {
    if (user?.data == null) return toast.error("Please log in to continue.");
    setSelectedColorId(color_id);
  };

  const handleConfirmColor = () => {
    if (selectedColorId == null) {
      toast.error("Please select a color!")
      return;
    }
    const data = {
      user_id: user?.data?._id,
      product_id: product_id,
      color_id: selectedColorId,
    };
    axiosInstance
      .post(`/cart/add-cart-item`, data)
      .then((response) => {
        if (response.data.flag == 1) {
          dispatch(
            addToCart({
              prices: prices,
              product_id: product_id,
              color_id: selectedColorId,
            })
          );

          setSelectedColorId(null);

          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        console.log(error.msessage);
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <div className={`flex justify-between mt-4 space-x-4 ${productView === "list" && "sm:w-[300px]" } `}>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-full bg-blue-400 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          <FaShoppingCart className="mr-2" />
        </button>

        <button className="flex items-center justify-center w-full bg-gray-200 hover:bg-red-500 hover:text-white text-red-500 font-semibold py-2 px-4 rounded-md transition duration-200">
          <FaHeart className="mr-2" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Choose a Color
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {colors.map((color) => (
                <button
                  key={color._id}
                  onClick={() => handleColorIdSelect(color._id)}
                  className={`py-2 px-4 rounded-lg border ${
                    selectedColorId === color._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmColor}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartButton;
