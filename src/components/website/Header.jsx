"use client";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";

import Image from "next/image";
import iShopLogo from "@/assest/images/iSHOP_Logo.svg";
import SearchIcon from "@/assest/images/search_icon.svg";
import BagIcon from "@/assest/images/bag_icon.svg";
import ProfileIcon from "@/assest/images/profile_icon.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout, lsToUser } from "@/redux/reducers/User";
import { lsToCart, removeCart } from "@/redux/reducers/Cart";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("home");
  const user = useSelector((store) => store.user.data);
  const cart = useSelector((store) => store.cart);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(lsToUser());
    dispatch(lsToCart());
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const value = url.pathname;
    const menus = ["home", "shop", "ipad", "mac", "accessory", "iphone"];
    menus.forEach((menu) => {
      if (value.includes(menu)) {
        setSelectedMenu(menu);
        return;
      }
    });
  }, []);

  return (
    <>
      <div className="w-full bg-white sticky top-0  z-50">
        <div className="w-full hidden sm:block bg-white shadow]">
          <div className="max-w-[1250px] mx-auto p-4 text-[14px] flex justify-between items-center sticky top-0 ">
            <div className="flex gap-3">
              <select
                name="language"
                className="font-bold text-[14px] outline-none"
              >
                <option value="en">EN</option>
                <option value="hi">Hi</option>
              </select>
              <select
                name="currency"
                className="font-bold text-[14px] outline-none"
              >
                <option value="$">$</option>
                <option value="₹">₹</option>
              </select>
            </div>
            <div className="flex gap-10 items-center text-[14px]">
              {user != null ? (
                <div className="flex gap-8 items-center font-bold">
                  <div className="flex gap-2 items-center">
                    <Image src={ProfileIcon} alt="ProfileIcon" />{" "}
                    <Link href={"/my-profile"}>
                      {" "}
                      <span>Hi, {user?.name == null ? "User" : user.name}</span>
                    </Link>
                  </div>
                  <Link href={"/cart"}>
                    <div className="flex gap-2 items-center">
                      <Image src={BagIcon} alt="BagIcon" />{" "}
                      <span>{cart?.items?.length} items</span>{" "}
                      <span className="text-[#929292]">
                        ${cart.final_total}
                      </span>
                    </div>
                  </Link>
                  <div>
                    <IoIosLogOut
                      className="text-xl cursor-pointer font-bold"
                      title="Logout"
                      onClick={() => {
                        dispatch(logout());
                        dispatch(removeCart());
                        router.push("/");
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <Image src={ProfileIcon} alt="ProfileIcon" />{" "}
                  <Link href={"/login"}>
                    {" "}
                    <span className="text-[#929292] font-bold cursor-pointer">
                      Login
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto flex flex-col items-center">
            <div>
              <Image src={iShopLogo} alt="iShopLogo" />
            </div>
            <div className="w-full  mt-4 relative">
              <ul className="max-w-[70%] mx-auto flex justify-evenly items-center p-3 text-[14px] font-bold ">
                <Link href={"/"}>
                  <li
                    onClick={() => setSelectedMenu("home")}
                    className={`hover:text-[#2E90E5] cursor-pointer pb-1 border-b-[3px] ${
                      selectedMenu == "home"
                        ? "border-b-[#33A0FF] text-[#33A0FF]"
                        : "border-transparent text-black"
                    }  `}
                  >
                    HOME
                  </li>
                </Link>
                <Link href={"/shop"}>
                  <li
                    onClick={() => setSelectedMenu("shop")}
                    className={`hover:text-[#2E90E5] cursor-pointer pb-1 border-b-[3px] border-transparent  group ${
                      selectedMenu == "shop"
                        ? "border-b-[#33A0FF] text-[#33A0FF]"
                        : "border-transparent text-black"
                    } `}
                  >
                    STORE
                    {/* <div className="w-full z-50 cursor-default max-h-[325px] absolute top-100 left-0 border p-8 invisible transition-opacity duration-500 opacity-0 group-hover:opacity-100 group-hover:visible flex justify-between bg-white ">
                      <div>
                        <h2 className="mb-4 text-[18px] text-[#C1C8CE] ">
                          Accessories
                        </h2>
                        <ul className="flex h-full text-[14px] flex-col items-start gap-5 gap-x-10 flex-wrap text-[#262626] font-thin  ">
                          <Link href={"#"}>
                            <li>Airport & Wireless</li>
                          </Link>
                          <li>AppleCare</li>
                          <li>Bags,Shells & Sleeves</li>
                          <li>Business & Security</li>
                          <li>Cable & Docks</li>
                          <li>Cameras & Videos</li>
                          <li>Car & Travels</li>
                          <li>Cases & Films</li>
                        </ul>
                      </div>
                      <div>
                        <h2 className="mb-4 text-[18px] text-[#C1C8CE] ">
                          Category
                        </h2>
                        <ul className="flex h-full text-[14px] flex-col items-start gap-5 gap-x-10 flex-wrap text-[#262626] font-thin  ">
                          <li>Charging Devices</li>
                          <li>Connexted Home</li>
                          <li>Device Care</li>
                          <li>Display & Graphic</li>
                          <li>Fitness & Sport</li>
                          <li>Headphones</li>
                          <li>HealthKit</li>
                        </ul>
                      </div>
                      <div>
                        <h2 className="mb-4 text-[18px] text-[#C1C8CE] ">
                          Category
                        </h2>
                        <ul className="flex h-full text-[14px] flex-col items-start gap-5 gap-x-10 flex-wrap text-[#262626] font-thin  ">
                          <li>Airport & Wireless</li>
                          <li>AppleCare</li>
                          <li>Bags,Shells & Sleeves</li>
                          <li>Business & Security</li>
                          <li>Cable & Docks</li>
                        </ul>
                      </div>
                    </div> */}
                  </li>
                </Link>
                <Link href={"/category/iphone"}>
                  <li
                    onClick={() => setSelectedMenu("iphone")}
                    className={`hover:text-[#2E90E5] pb-1 border-b-[3px] border-transparent cursor-pointer ${
                      selectedMenu == "iphone"
                        ? "border-b-[#33A0FF] text-[#33A0FF]"
                        : "border-transparent text-black"
                    } `}
                  >
                    IPHONE
                  </li>
                </Link>
                <Link href={"/category/ipad"}>
                  <li
                    onClick={() => setSelectedMenu("ipad")}
                    className={`hover:text-[#2E90E5] pb-1 border-b-[3px] border-transparent cursor-pointer ${
                      selectedMenu == "ipad"
                        ? "border-b-[#33A0FF] text-[#33A0FF]"
                        : "border-transparent text-black"
                    } `}
                  >
                    IPAD
                  </li>
                </Link>
                <Link href={"/category/mac"}>
                  <li
                    onClick={() => setSelectedMenu("mac")}
                    className={`hover:text-[#2E90E5] pb-1 border-b-[3px] border-transparent cursor-pointer ${
                      selectedMenu == "mac"
                        ? "border-b-[#33A0FF] text-[#33A0FF]"
                        : "border-transparent text-black"
                    } `}
                  >
                    MACBOOK
                  </li>
                </Link>
                <Link href={"/accessory"}>
                  <li
                    onClick={() => setSelectedMenu("accessories")}
                    className={`hover:text-[#2E90E5] pb-1 border-b-[3px] border-transparent cursor-pointer ${
                      selectedMenu == "accessories"
                        ? "border-b-[#33A0FF] text-[#33A0FF]"
                        : "border-transparent text-black"
                    } `}
                  >
                    ACCESSORIES
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white sm:hidden p-5 flex items-center justify-between sticky top-0 z-[50000] bg-opacity-100">
        <div className="text-[#FF4252] text-[40px] font-bold">iSHOP</div>
        <div>
          <RiMenu2Line
            onClick={() => setMobileMenuOpen(true)}
            className="text-[36px] cursor-pointer"
          />
        </div>
      </div>
      <div
        className={`fixed z-[50000] top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 transition p-6 ${
          mobileMenuOpen == true ? "visible" : "invisible"
        }`}
      >
        <div className="flex justify-between items-center">
          <FaTimes
            onClick={() => setMobileMenuOpen(false)}
            className="text-white text-[30px] cursor-pointer"
          />
        </div>
        <div className="text-white flex justify-between items-center mt-10 pb-2 border-b">
          <Link href={"/cart"}>
            <div onClick={() => setMobileMenuOpen(false)} className="flex gap-2 items-center text-[14px]">
              <Image src={BagIcon} className="invert" alt="BagIcon" />{" "}
              <span>{cart?.items?.length} items</span>{" "}
              <span className="text-[#929292]">${cart.final_total}</span>
            </div>
          </Link>
          <div onClick={() => setMobileMenuOpen(false)} className="flex gap-2 items-center text-[14px]">
           {
            user ?  <Link className="flex gap-2" href={"/my-profile"}>
            <Image src={ProfileIcon} className="invert" alt="ProfileIcon" />{" "}
            <span> {user?.name != null && `Hi, ${user.name}`}</span>
          </Link>
          :
          <span className="text-red-700 font-bold" onClick={()=>router.push("/login")}>Login</span>
           }
          </div>
        </div>
        <div className="mt-8">
          <ul className="text-white flex flex-col gap-8 items-center text-[16px]">
            <Link href={"/"}>
              <li
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer"
              >
                HOME
              </li>
            </Link>
            <Link href={"/shop"}>
              {" "}
              <li
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer"
              >
                STORE ▼
              </li>
            </Link>
            <Link href={"/category/iphone"}>
              <li
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer"
              >
                IPHONE
              </li>
            </Link>
            <Link href={"/category/ipad"}>
              <li
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer"
              >
                IPAD
              </li>
            </Link>
            <Link href={"/category/mac"}>
              <li
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer"
              >
                MACBOOK
              </li>
            </Link>
            <Link href={"/accessory"}>
              <li
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer"
              >
                ACCESSORIES
              </li>
            </Link>
            {user && (
              <li
                onClick={() => {
                  dispatch(logout());
                  dispatch(removeCart());
                  router.push("/");
                  setMobileMenuOpen(false);
                }}
                title="Logout"
                className="flex gap-4 text-[18px] items-center text-red-900 font-bold"
              >
                <div>
                  <IoIosLogOut
                    className="text-xl cursor-pointer font-bold"
                    title="Logout"
                  />
                </div>
                <span>Logout</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
