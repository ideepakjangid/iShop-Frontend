"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { VscGraph } from "react-icons/vsc";
import {
  FaBoxOpen,
  FaTags,
  FaPalette,
  FaGem,
  FaArrowsAltH,
  FaTachometerAlt,
  FaShoppingCart,
  FaListAlt,
  FaUsers,
  FaKey,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const routes = useRouter();
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  // useEffect(
  //   ()=>{
  //     dispatch(lsToAdmin());
  //   },[]
  // )

  useEffect(() => {
    if (admin?.data == null && localStorage.getItem("admin") == null) {
      routes.push("/admin/login");
    }
  }, [admin?.data]);

  const overviesItmes = [
    {
      name: "Dashboard",
      url: "/admin",
      icon: <FaTachometerAlt />,
      featureType: 2, // admin or sub-admin
    },
    {
      name: "Products",
      url: "/admin/products",
      icon: <FaBoxOpen />,
      featureType: 3,
    },
    {
      name: "Categories",
      url: "/admin/categories",
      icon: <FaTags />,
      featureType: 3,
    },
    {
      name: "Colors",
      url: "/admin/colors",
      icon: <FaPalette />,
      featureType: 3,
    },
    {
      name: "Accessory",
      url: "/admin/accessory",
      icon: <FaGem />,
      featureType: 3,
    },
    {
      name: "Orders",
      url: "/admin/orders",
      icon: <FaShoppingCart />,
      featureType: 2,
    },
    {
      name: "Transaction",
      url: "/admin/transaction",
      icon: <FaListAlt />,
      featureType: 1,
    },
    {
      name: "Website User",
      url: "/admin/website-users",
      icon: <FaUsers />,
      featureType: 1,
    },
    {
      name: "Admin User",
      url: `${admin?.data?.type == 1 ? "/admin/admin-list" : "/admin/not-allowed"}`,
      icon: <FaUsers />,
      featureType: 1,
    },
    {
      name: "Change Password",
      url: `${admin?.data?.type == 1 ? "/admin/change-password" : "/admin/not-allowed"}`,
      icon: <FaKey />,
      featureType: 1,
    },
  ];
  return (
    <div className="bg-[#f9fbfa] text-white min-h-screen">
      <div className="sticky top-0 z-10 bg-white">
        <h1 className="text-2xl p-3 text-[#000000] font-bold text-center shadow-lg">
          Ishop Admin
        </h1>
      </div>
      <Menu admin={admin} title="OVERVIEW" itmeObj={overviesItmes} />
    </div>
  );
};

export default SideBar;

const Menu = ({ title, itmeObj, admin }) => {
  return (
    <div className="p-3">
      <h2 className="text-gray-600 font-bold text-[14px]">{title}</h2>
      <ul>
        {itmeObj.map((item, index) => {
        if(admin?.data?.type == 2 && item.featureType == 1) return;
        if(admin?.data?.type == 3 && item.featureType != 3) return;
        return(
          <li
            key={index}
            className=" px-2 text-black hover:bg-white hover:text-white"
          >
            <Link
              href={item.url}
              className="flex gap-2 items-center py-1 my-2 text-[13px] font-semibold text-[#58595a]"
            >
              {item.icon} {item.name}
            </Link>
          </li>
        )})}
      </ul>
    </div>
  );
};
