"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../library/helper";
import { updateUser } from "@/redux/reducers/User";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEllipsisV } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProfileCard from "@/components/website/ProfileCard";
import {
  FaShoppingBag,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaCreditCard,
} from "react-icons/fa";

const MyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [menuOption, setMenuOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState(null);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.data);
  const token = useSelector(store=>store.user.token)
  const routes = useRouter();

  useEffect(() => {
    if (user?.data == null && localStorage.getItem("user") == null) {
      routes.push("/login");
    }
  }, [user?.data]);

  const fethcOrders = () => {
    axiosInstance
      .get(`/order/${user?._id}`)
      .then((response) => {
        if (response.data.flag == 1) {
          setOrders(response.data.orders);
        }
      })
      .catch((error) => {
        console.log("Errro while fetching orders", error.message);
      });
  };

  const menuOptionHandler = (index) => {
    if (menuOption == index) {
      setMenuOption(null);
    } else {
      setMenuOption(index);
    }
  };

  // document.body.addEventListener("click", () => {
  //   setMenuOption(null);
  // });

  const setDefalutHandler = (index) => {
    setMenuOption(null);
    axiosInstance
      .patch(`/user/set-default-address/${user._id}`, { index: index })
      .then((response) => {
        if (response.data.flag == 1) {
          dispatch(updateUser({ user: response.data.user }));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success("Address Set as Default Successfully");
        }
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  const addressDeleteHandler = (index) => {
    setMenuOption(null);
    axiosInstance
      .patch(`/user/delete-address/${user._id}`, { index: index })
      .then((response) => {
        if (response.data.flag == 1) {
          dispatch(updateUser({ user: response.data.user }));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success("Address Deleted Successfully");
        }
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  const changePasswordHandler = (e) => {
    e.preventDefault();
    const data = {
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
      ConfirmNewPassword: e.target.ConfirmNewPassword.value,
    };
    if (
      data.oldPassword == "" ||
      data.newPassword == "" ||
      data.ConfirmNewPassword == ""
    ) {
      toast.error("All fields are required");
      return;
    }
    if (data.newPassword != data.ConfirmNewPassword) {
      toast.error("Password does not match");
      return;
    }
    axiosInstance
      .patch(`/user/change-password/${user._id}`, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
      .then((response) => {
        if (response.data.flag == 1) {
          toast.success("Password Changed Successfully");
          dispatch(updateUser({ user: response.data.user }));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          e.target.reset();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Error Occured");
      });
  };

  const updateProfileHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      contact: e.target.contact.value,
    };
    if (data.name == "" || data.email == "" || data.contact == "") {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }
    axiosInstance
      .put(`/user/update-user/${user._id}`, data,
        {
          headers:{
            Authorization:token
          }
        }
      )
      .then((response) => {
        console.log(response)
        setLoading(false);
        if (response.data.flag == 1) {
          toast.success("Profile Updated Successfully");
          dispatch(updateUser({ user: response.data.user }));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          e.target.reset();
        } else {
          toast.error("Error Occured");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error Occured");
      });
  };

  const handleEditAddress = (address) => {
    const formData = new FormData();
    const data = {
      name: address.name,
      phone: address.phone,
      house: address.house,
      district: address.district,
      state: address.state,
      pin: address.pin,
      block: address.block,
      area: address.area,
    };

    axiosInstance
      .patch(`/user/edit-address/${user._id}`, data)
      .then((response) => {
        if (response.data.flag == 1) {
          dispatch(updateUser({ user: response.data.user }));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success("Address Added Successfully");
        }
      })
      .catch((error) => {
        console.log("Error");
      });
  };
  const handleSaveAddress = (address) => {
    const formData = new FormData();
    const data = {
      name: address.name,
      phone: address.phone,
      house: address.house,
      district: address.district,
      state: address.state,
      pin: address.pin,
      block: address.block,
      area: address.area,
    };

    axiosInstance
      .patch(`/user/add-address/${user._id}`, data)
      .then((response) => {
        if (response.data.flag == 1) {
          dispatch(updateUser({ user: response.data.user }));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success("Address Added Successfully");
        }
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  return (
    <div className="w-full  sm:max-w-[1100px] mx-auto grid grid-cols-1  md:grid-cols-4 gap-8  mt-8">
      <div className=" p-6 shadow-0 sm:shadow-lg col-span-1 md:col-span-4 lg:col-span-1 rounded-lg h-fit">
        {/* <WebcamCapture /> */} 
        <ProfileCard />
      </div>
      <div className="p-3 sm:p-6  md:col-span-4 lg:col-span-3 w-full mx-auto bg-white shadow-md rounded-lg mb-16">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">
          My Profile
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-around border-b mb-4 text-[14px] ">
          <button
            onClick={() => setActiveTab("details")}
            className={`py-2 px-4 font-semibold ${
              activeTab === "details"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            My Details
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`py-2 px-4 font-semibold ${
              activeTab === "addresses"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Saved Addresses
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`py-2 px-4 font-semibold ${
              activeTab === "password"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Change Password
          </button>
          <button
            onClick={() => {
              setActiveTab("orders"), fethcOrders();
            }}
            className={`py-2 px-4 font-semibold ${
              activeTab === "orders"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            My Order
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "details" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Details</h2>
              <form onSubmit={updateProfileHandler} className="space-y-4">
                <div>
                  <label name="name" className="block text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    name="name"
                    defaultValue={user?.name}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label name="email" className="block text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="johndoe@example.com"
                    defaultValue={user?.email}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label name="contact" className="block text-gray-700 mb-1">
                    Contact
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Enter your contact number"
                    defaultValue={user?.contact != null ? user.contact : ""}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
                >
                  <ClipLoader size={15} loading={loading} /> Update Details
                </button>
              </form>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
              <div className="space-y-4 relative">
                {user?.address && user.address.length > 0 ? (
                  user.address.map((adrs, index) => {
                    return (
                      <div
                        key={index}
                        className={`p-4 border rounded-md bg-gray-50 grid grid-cols-2 ${
                          adrs.isDefault == true &&
                          "border-green-400 bg-green-200"
                        } `}
                      >
                        <p className="text-gray-700">
                          <strong>Name:</strong> {adrs.name}
                        </p>
                        <p className="text-gray-700">
                          <strong>Phone:</strong> {adrs.phone}
                        </p>
                        <p className="text-gray-700">
                          <strong>House:</strong> {adrs.house}
                        </p>
                        <p className="text-gray-700">
                          <strong>Pin:</strong> {adrs.pin}
                        </p>
                        <p className="text-gray-700">
                          <strong>Area:</strong> {adrs.area}
                        </p>
                        <p className="text-gray-700">
                          <strong>Block:</strong> {adrs.block}
                        </p>
                        <p className="text-gray-700">
                          <strong>District:</strong> {adrs.district}
                        </p>
                        <p className="text-gray-700">
                          <strong>State:</strong> {adrs.state}
                        </p>
                        <div className=" mt-2 hover:underline absolute right-3  ">
                          <div className="relative">
                            <FaEllipsisV
                              onClick={() => menuOptionHandler(index)}
                              className="cursor-pointer"
                            />
                            <div
                              className={`absolute right-0  bg-white border shadow-md rounded-md w-32 ${
                                menuOption == index ? "block" : "hidden"
                              }`}
                            >
                              <ul className="text-sm text-gray-700">
                                <EditAddressModal
                                  onSave={() => setMenuOption(null)}
                                  dispatch={dispatch}
                                  user={user}
                                  index={index}
                                  adrs={adrs}
                                />
                                <li
                                  onClick={() => addressDeleteHandler(index)}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  Remove
                                </li>
                                <li
                                  onClick={() => setDefalutHandler(index)}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  Set Default
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h2>No Address</h2>
                )}

                <UpdateAddressModal
                  onClose={() => setIsOpen(false)}
                  isOpen={isOpen}
                  onSave={handleSaveAddress}
                />

                <button
                  onClick={() => setIsOpen(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add New Address
                </button>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <form onSubmit={changePasswordHandler} className="space-y-4">
                <div>
                  <label
                    name="oldPassword"
                    className="block text-gray-700 mb-1"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Enter current password"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    name="newPassword"
                    className="block text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    name="ConfirmNewPassword"
                    className="block text-gray-700 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="ConfirmNewPassword"
                    placeholder="Confirm new password"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Change Password
                </button>
              </form>
            </div>
          )}
          {activeTab === "orders" && (
            <MyOrders setOrders={setOrders} orders={orders} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

const EditAddressModal = ({ adrs, index, user, dispatch, onSave }) => {
  const [openEditAddress, setOpenEditAddress] = useState(false);
  console.log("Address is",adrs)

  const [postOffices, setPostOffices] = useState([]);
  const [address, setAddress] = useState(adrs);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const autoFillPincodeHandler = async (e) => {
    if (e.target.value.length == 6) {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${address.pin}`
      );
      if (response.data[0].Status == "Success") {
        const d = response.data[0].PostOffice;
        setPostOffices(response.data[0].PostOffice);
        setAddress({
          ...address,
          district: d[0].District,
          state: d[0].State,
          block: d[0].Block,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    setAddress({ ...address, area: e.target.area.value });
    e.preventDefault();
    const formData = new FormData();
    const data = {
      name: address.name,
      phone: address.phone,
      house: address.house,
      district: address.district,
      state: address.state,
      pin: address.pin,
      block: address.block,
      area: address.area,
    };

    axiosInstance
      .patch(`/user/edit-address/${user._id}`, { data, index })
      .then((response) => {
        if (response.data.flag == 1) {
          dispatch(updateUser({ user: response.data.user }));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success("Address edited Successfully");
        }
      })
      .catch((error) => {
        console.log("Error");
      });

    setOpenEditAddress(false);
    onSave();
  };

  return (
    <>
      <li
        onClick={() => {
          setOpenEditAddress(true);
        }}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        Edit
      </li>
      {openEditAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Edit Shipping Address
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={address.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleChange}
                    required
                    placeholder="123-456-7890"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* house */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-700 mb-1">
                    House Address
                  </label>
                  <input
                    type="text"
                    name="house"
                    value={address.house}
                    onChange={handleChange}
                    required
                    placeholder="House No. 123 "
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* pin Code */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-700 mb-1">PIN Code</label>
                  <input
                    type="text"
                    name="pin"
                    maxLength={6}
                    value={address.pin}
                    onChange={handleChange}
                    onKeyUp={autoFillPincodeHandler}
                    required
                    placeholder="10001"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Delivery Area */}
                <div>
                  <label name="area" className="block text-gray-700 mb-1">
                    Delivery Area
                  </label>
                  <select
                    onChange={handleChange}
                    name="area"
                    className="outline-none w-full py-3 pr-3"
                  >
                    <option value="select an area">Select an area </option>
                    {postOffices.map((postOffice, index) => {
                      return (
                        <option key={index} value={postOffice.Name}>
                          {postOffice.Name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* Block */}
                <div>
                  <label className="block text-gray-700 mb-1">Block</label>
                  <input
                    type="text"
                    name="block"
                    value={address.block}
                    onChange={handleChange}
                    required
                    placeholder="NY"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* City */}
                <div>
                  <label className="block text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    name="district"
                    value={address.district}
                    onChange={handleChange}
                    required
                    placeholder="New York"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* State */}
                <div>
                  <label className="block text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    required
                    placeholder="NY"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpenEditAddress(false)}
                  className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
const UpdateAddressModal = ({ isOpen, onClose, onSave }) => {
  const [postOffices, setPostOffices] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    house: "",
    district: "",
    state: "",
    pin: "",
    block: "",
    area: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const autoFillCityStateHandler = async (e) => {
    if (e.target.value.length === 6) {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${e.target.value}`
      );
      if (response.data[0].Status === "Success") {
        const d = response.data[0].PostOffice;
        setPostOffices(d);
        setAddress({
          ...address,
          district: d[0].District,
          state: d[0].State,
          block: d[0].Block,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(address);
    onClose();
    setAddress({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg sm:p-8 p-6 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Update Shipping Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={address.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={address.phone}
                onChange={handleChange}
                required
                placeholder="123-456-7890"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* House Address */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-gray-700 mb-1">House Address</label>
              <input
                type="text"
                name="house"
                value={address.house}
                onChange={handleChange}
                required
                placeholder="House No. 123"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* PIN Code */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-gray-700 mb-1">PIN Code</label>
              <input
                type="text"
                name="pin"
                value={address.pin}
                maxLength={6}
                onChange={handleChange}
                onKeyUp={autoFillCityStateHandler}
                required
                placeholder="10001"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Delivery Area */}
            <div>
              <label className="block text-gray-700 mb-1">Delivery Area</label>
              <select
                name="area"
                onChange={handleChange}
                className="outline-none w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an area</option>
                {postOffices.map((postOffice, index) => (
                  <option key={index} value={postOffice.Name}>
                    {postOffice.Name}
                  </option>
                ))}
              </select>
            </div>
            {/* Block */}
            <div>
              <label className="block text-gray-700 mb-1">Block</label>
              <input
                type="text"
                name="block"
                value={address.block}
                onChange={handleChange}
                required
                placeholder="NY"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* District */}
            <div>
              <label className="block text-gray-700 mb-1">District</label>
              <input
                type="text"
                name="district"
                value={address.district}
                onChange={handleChange}
                required
                placeholder="New York"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* State */}
            <div>
              <label className="block text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                required
                placeholder="NY"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buttons - Fixed at Bottom */}
          <div className="flex justify-end space-x-3 mt-4 sticky bottom-0 bg-white p-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const MyOrders = ({ orders, setOrders }) => {
  const router = useRouter();
  const [menuOption, setMenuOption] = useState(null);

  const menuOptionHandler = (index) => {
    if (menuOption == index) {
      setMenuOption(null);
      return;
    }
    setMenuOption(index);
  };
  document.body.addEventListener("click", () => {
    setMenuOption(null);
  });

  const orderDeleteHandler = (order_id) => {
    axiosInstance
      .post(`/order/delete-order/${order_id}`)
      .then((response) => {
        if (response.data.flag == 1) {
          const updatedOrder = orders.filter((order) => {
            return order._id != order_id;
          });
          setOrders(updatedOrder);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };
  // Status Mapping
  const orderStatusMap = {
    0: { text: "Pending", icon: <FaShoppingBag className="text-yellow-500" /> },
    1: { text: "Order Placed", icon: <FaTruck className="text-blue-500" /> },
    2: {
      text: "Order Packed",
      icon: <FaCheckCircle className="text-green-500" />,
    },
    3: { text: "Cancelled", icon: <FaTimesCircle className="text-red-500" /> },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <FaShoppingBag className="text-blue-600" />
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 mt-4">No orders found.</p>
      ) : (
        <div className="space-y-6 mt-4">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-2 border"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Order ID: <span className="font-semibold">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Date:{" "}
                    <span className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Order Type:{" "}
                    <span className="font-semibold">
                      {order.payment_method == 1
                        ? "Cash On Delivery"
                        : "Online Payment"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {orderStatusMap[order.order_status]?.icon}
                  <span className="font-semibold">
                    {orderStatusMap[order.order_status]?.text}
                  </span>
                  <div className="relative">
                    <FaEllipsisV
                      onClick={() => menuOptionHandler(index)}
                      className="cursor-pointer"
                    />
                    <div
                      className={`absolute right-0  bg-white border shadow-md rounded-md w-32 ${
                        menuOption == index ? "block" : "hidden"
                      }`}
                    >
                      <ul className="text-sm text-gray-700">
                        <li
                          onClick={() => orderDeleteHandler(order._id)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Remove
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product List */}
              <div className="space-y-3">
                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/products/${product.product_id.image}`}
                      alt={product.product_id.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.product_id.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {product.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 line-through text-sm">
                        ₹{product.original_price}
                      </p>
                      <p className="text-green-600 font-semibold">
                        ₹{product.final_price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment & Total */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm font-semibold">
                  Total Paid:{" "}
                  <span className="text-green-600">₹{order.final_total}</span>
                </p>
                <p
                  className={`text-sm flex items-center gap-2 ${
                    order.payment_status === 2
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  <FaCreditCard />
                  {order.payment_status === 2 ? "Paid" : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
