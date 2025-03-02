"use client";
import { axiosInstance } from "@/app/library/helper";
import { removeCart } from "@/redux/reducers/Cart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useRazorpay } from "react-razorpay";
import ClipLoader from "react-spinners/ClipLoader";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const { Razorpay } = useRazorpay();
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const router = useRouter();

  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();


  useEffect(() => {
    if (user?.data == null && localStorage.getItem("user") == null) {
      router.push("/login");
    }
  }, [user?.data]);

  const orderPlaceHandler = () => {
    if (user?.data?.address.length === 0) return alert("Please add an address");
    setLoading(true);
    const data = {
      user_id: user?.data?._id,
      payment_method: paymentMethod,
      address: selectedAddress,
    };
    axiosInstance
      .post("/order/create", data)
      .then((response) => {
        if (response.data.flag == 1) {
          if (paymentMethod == 1) {
            setLoading(false);
            dispatch(removeCart());
            router.push(`/order-placed/${response.data.order_id}`);
          } else {
            showRazorPayPopUp(response.data.razorpay_order_id, response.data.order_id);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const showRazorPayPopUp = (razorpay_order_id, order_id) => {
    const options = {
      key: process.env.NEXT_PUBLIC_KEY_ID,
      amount: cart?.final_total * 100,
      currency: "INR",
      name: "IShop",
      description: "Test Transaction",
      order_id: razorpay_order_id,
      handler: (response) => {
        axiosInstance
          .post("/order/payment-success", { response, order_id })
          .then((response) => {
            if (response.data.flag == 1) {
              setLoading(false);
              dispatch(removeCart());
              router.push(`/order-placed/${response.data.order_id}`);
            }
          })
          .catch((error) => {
            setLoading(false);
            alert("Something went wrong ", error.message);
          });
      },
      prefill: {
        name: user?.data?.name,
        email: user?.data?.email,
        contact: user?.data?.contact,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.on("payment.failed", function (response) {
      axiosInstance
        .post("/order/payment-failed", {
          razorpay_payment_id: response.error.metadata.payment_id,
          rezorpay_order_id: response.error.metadata.order_id,
          order_id,
        })
        .then((response) => {
          if (response.data.flag == 1) {
            router.push(`/order-failed/${response.data.order_id}`);
          } else {
            alert("Something went wrong");
          }
        });
    });
    razorpayInstance.open();
  };

  return (
    <>
      <div className="w-full bg-[#F6F7F8] mt-8">
        <h1 className="text-black font-semibold text-lg flex justify-center items-center h-[51px]">
          Checkout
        </h1>
      </div>

      <div className="max-w-[1100px] mx-auto p-6 my-8 bg-white shadow-lg rounded-lg">
        {/* Address Selection */}
        <div>
          <h3 className="font-semibold mb-2 text-lg">Select Address</h3>
          <div className="space-y-3">
            {user?.data?.address.length === 0 ? (
              <h2>No address available</h2>
            ) : (
              user?.data?.address.map((address, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAddress(index)}
                  className={`flex flex-wrap items-center p-3 border rounded-lg w-full text-left transition ${
                    selectedAddress === index ? "border-blue-500 bg-blue-100" : "border-gray-300"
                  }`}
                >
                  <FaMapMarkerAlt className="text-blue-500 mr-2" />
                  {address.name}, {address.contact}, {address.area}, {address.district},{" "}
                  {address.state}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg">Payment Method</h3>
          <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-2">
            <button
              onClick={() => setPaymentMethod(1)}
              className={`flex items-center px-4 py-3 border rounded-lg w-full sm:w-auto transition ${
                paymentMethod === 1 ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
            >
              <FaMoneyBillWave className="text-green-500 mr-2" /> Cash on Delivery
            </button>
            <button
              onClick={() => setPaymentMethod(2)}
              className={`flex items-center px-4 py-3 border rounded-lg w-full sm:w-auto transition ${
                paymentMethod === 2 ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
            >
              <SiRazorpay className="text-blue-500 mr-2" /> Razorpay
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h3 className="font-semibold mb-2 text-lg">Order Summary</h3>
          <div className="flex justify-between text-sm sm:text-base">
            <span>Cart Total:</span> <span>${cart?.original_total}</span>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <span>Discount:</span>{" "}
            <span className="text-red-500">-${cart?.original_total - cart?.final_total}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Final Total:</span> <span>${cart?.final_total}</span>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={orderPlaceHandler}
          className={`mt-6 w-full bg-blue-600 text-white py-3 rounded-lg flex items-center gap-2 justify-center hover:bg-blue-700 transition ${user?.data?.address.length === 0 && "pointer-events-none"}`}
        >
          <ClipLoader size={15} loading={loading} /> <span>Proceed to Payment</span>
        </button>
      </div>
    </>
  );
}
