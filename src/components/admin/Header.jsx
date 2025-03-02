"use client";
import React, { useEffect } from "react";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {logoutAdmin, lsToAdmin } from "@/redux/reducers/Admin";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const admin = useSelector(state=>state.admin);

    useEffect(
      ()=>{
        dispatch(lsToAdmin())
      },[]
    )

    useEffect(
      ()=>{
        if(admin?.data == null && localStorage.getItem("admin") == null){
          router.push("/admin/login")
        }
      },[admin?.data]
    )

  return (
    <div className=" z-20 text-white px-4 py-2 shadow-lg flex justify-between bg-white items-center sticky top-0">
      <div className="flex items-center gap-3" >
        <FaUserCircle className="text-2xl text-black" />
        <h1 className="font-bold text-black">Hi, {admin?.data?.name == null ? "Admin" : admin.data.name}</h1>
      </div>
      <div className="flex justify-end items-center">
        <button onClick={()=> dispatch(logoutAdmin())} className="bg-red-500 p-2 rounded flex items-center gap-2">
          <span>Logout</span>
          <IoMdLogOut />
        </button>
      </div>
    </div>
  );
};

export default Header;
