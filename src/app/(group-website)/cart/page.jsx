"use client";
import { getProducts } from "@/app/library/api-calls";
import { axiosInstance } from "@/app/library/helper";
import { addToCart, descQuantity, removeProduct } from "@/redux/reducers/Cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.data == null && localStorage.getItem("user") == null) {
      router.push("/");
    }
  }, [user?.data]);

  const fetchProducts = async () => {
    const response = await getProducts(null,null,null,null,null,24);
    setProducts(response.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const decQuantity = (
    product_id,
    color_id,
    original_price,
    discounted_price
  ) => {
    axiosInstance
      .post(`/cart/decrease-quantity`, {
        user_id: user?.data?._id,
        product_id: product_id,
        color_id: color_id,
      })
      .then((response) => {
        if (response.data.flag == 1) {
          dispatch(
            descQuantity({
              product_id: product_id,
              color_id: color_id,
              prices: {
                original_price: original_price,
                discounted_price: discounted_price,
              },
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };
  const incQuantity = (
    product_id,
    color_id,
    original_price,
    discounted_price
  ) => {
    axiosInstance
      .post(`/cart/add-cart-item`, {
        user_id: user?.data?._id,
        product_id: product_id,
        color_id: color_id,
      })
      .then((response) => {
        if (response.data.flag == 1) {
          dispatch(
            addToCart({
              product_id: product_id,
              color_id: color_id,
              prices: {
                original_price: original_price,
                discounted_price: discounted_price,
              },
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };

  const removeItem = (
    product_id,
    color_id,
    original_price,
    discounted_price
  ) => {
    const prices = {
      originalPrice: original_price,
      discountedPrice: discounted_price,
    };
    const data = {
      user_id: user?.data?._id,
      product_id: product_id,
      color_id: color_id,
    };
    axiosInstance
      .delete("/cart/delete-cart-item", { data })
      .then((response) => {
        if (response.data.flag == 1) {
          dispatch(
            removeProduct({ productId: product_id, color_id: color_id, prices })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div>
      <div className="w-full bg-[#F6F7F8] mt-0 sm:mt-8">
        <h1 className="text-black font-[600] text-[14px] flex justify-center items-center h-[51px]">
          Cart
        </h1>
      </div>
      <div className="max-w-[1100px] mx-auto my-8 p-3 sm:p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>

        <table className="w-full border-collapse mb-4 hidden sm:table ">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          {cart?.items?.length == 0 ? (
            <h1 className=" p-4"> No cart item</h1>
          ) : (
            <tbody>
              {cart?.items?.map((item, index) => {
                console.log("Item id",item.product_id)
                const product = products.find(
                  (product) => product._id == item.product_id
                );
                console.log("Product is",product)
                return (
                  <tr key={index} className="border-b">
                    <td className="p-2 flex items-center gap-4">
                      <button
                        onClick={() =>
                          removeItem(
                            item?.product_id,
                            item?.color_id,
                            product?.original_price,
                            product?.discounted_price
                          )
                        }
                        className="text-red-500"
                      >
                        <FaTimes size={18} />
                      </button>
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/products/${product?.image}`}
                        alt={product?.name}
                        className="w-20 h-16 object-cover"
                      />
                      <span className="truncate w-full text-[16px]">
                        {product?.name}
                      </span>
                    </td>
                    <td className="p-2">${product?.original_price}</td>
                    <td className="p-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          decQuantity(
                            product._id,
                            item?.color_id,
                            product.original_price,
                            product.discounted_price
                          )
                        }
                        className="p-1 border rounded"
                      >
                        <FaMinus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          incQuantity(
                            product._id,
                            item?.color_id,
                            product.original_price,
                            product.discounted_price
                          )
                        }
                        className="p-1 border rounded"
                      >
                        <FaPlus size={14} />
                      </button>
                    </td>
                    <td className="p-2">
                      ${product?.original_price * item.quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        <div className="max-w-lg mx-auto p-4 sm:hidden">
          { cart?.items?.length == 0 ? <h1>No cart item</h1> : cart?.items?.map((item, index) => {
            const product = products.find(
              (product) => product._id == item.product_id
            );
            return (
              <div
                key={index}
                className="flex items-center justify-between bg-white shadow-md p-2 rounded-lg mb-4 relative"
              >
                {/* Product Image */}
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/products/${product?.image}`} // Replace with actual product image
                    alt="Product"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Product Details */}
                  <div className="flex-1 px-4 col-span-2">
                    <h2 className="text-sm font-semibold">{product?.name}</h2>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          decQuantity(
                            product._id,
                            item?.color_id,
                            product.original_price,
                            product.discounted_price
                          )
                        }
                        className="px-2 py-1 border-r"
                      >
                        <FaMinus className="text-gray-600" />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() =>
                          incQuantity(
                            product._id,
                            item?.color_id,
                            product.original_price,
                            product.discounted_price
                          )
                        }
                        className="px-2 py-1 border-l"
                      >
                        <FaPlus className="text-gray-600" />
                      </button>
                    </div>
                    <span className="text-lg font-bold">
                      ${product?.original_price * item?.quantity}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      removeItem(
                        item?.product_id,
                        item?.color_id,
                        product?.original_price,
                        product?.discounted_price
                      )
                    }
                    className="text-red-500 ml-4 absolute top-1 left-[-4px]"
                  >
                    <FiX className="text-lg" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Voucher code"
            className="w-1/2 p-2 border rounded"
          />
          <button className="p-2 bg-blue-500 text-white rounded">Redeem</button>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>${cart?.original_total}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Coupon</span>
            <span>No</span>
          </div>
          <div className="flex justify-between text-lg font-semibold mt-2">
            <span>Total</span>
            <span>${cart?.final_total}</span>
          </div>
        </div>

        <Link
          href={"/checkout"}
          className={`w-full  text-center mt-4 p-2 flex justify-center items-center bg-blue-500 text-white rounded ${cart?.items?.length == 0 && "pointer-events-none"}`}
        >
          <ClipLoader size={15} loading={loading} />{" "}
          <span onClick={() => setLoading(true)}>Check out</span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
