import { getCategories, getColors } from "@/app/library/api-calls";
import PriceRangeSlider from "@/components/website/PriceRangeSlider";
import Link from "next/link";
import React from "react";
import iPhoneImage from "@/assest/images/iphone_8.png";
import Image from "next/image";
import ColorOption from "@/components/website/ColorOption";
import Corousel from "@/assest/images/2_corousel.png";

const Layout = async ({ children }) => {
  const response = await getCategories();
  const colors = await getColors();
  return (
    <div>
      <section className="md:hidden w-full h-[450px] bg-[#2E90E5] relative ">
        <div className="max-w-[1100px] mx-auto sm:flex justify-between items-center">
          <div className="w-full sm:w-[50%] p-10 sm:p-[112px] flex flex-col gap-5 ">
            <h1 className="text-[32px] sm:text-[38px] text-white ">
              iPhone One Plus
            </h1>
            <span className="w-[90%] sm:w-full text-[18px] sm:text-[16px] text-white tracking-[0.4]">
              Performance and design. Taken right to the edge.
            </span>
            <div>
              <Link
                href={"#"}
                className="w-[100px] border-b-[3px] pb-1 block sm:inline mt-7 sm:mt-0  border-white uppercase font-bold text-white"
              >
                Shop now
              </Link>
            </div>
          </div>
          <div className=" absolute bottom-0 w-[75%] sm:w-full left-[25%]  sm:left-[60%]">
            {/* <img className="w-full"  src={iPhoneImage} alt="" /> */}
            <Image src={Corousel} alt="Corousel" height={500} />
          </div>
        </div>
      </section>
      <div className="w-full bg-[#F6F7F8] mt-8">
        <h1 className="text-[#33A0FF] font-[600] text-[14px] flex justify-center items-center h-[51px]">
          Store <span className="mx-3 text-[#C1C8CE]">/</span> Accessories
        </h1>
      </div>
      <div className="max-w-[1200px] overflow-hidden md:px-5 lg:px-0 z-50 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 sm:mt-12">
        <div className="hidden sm:block">
          <div className="bg-[#F6F7F8] p-4 rounded">
            <h2 className="mt-2 mb-5 uppercase text-[18px] font-semibold">
              Category
            </h2>
            <div>
              <Link href={`/shop`}>
                <div className="hover:text-[#33A0FF] text-[#22262A] text-[14px] my-3 font-semibold relative">
                  All
                </div>
              </Link>

              {response?.categories.map((category) => {
                return (
                  category.productCount > 0 && (
                    <Link key={category._id} href={`/shop/${category.slug}`}>
                      <div className="hover:text-[#33A0FF] text-[#22262A] text-[14px] my-3 font-semibold relative">
                        {category.name}{" "}
                        <span className=" absolute right-0">
                          ({category.productCount})
                        </span>
                      </div>
                    </Link>
                  )
                );
              })}
            </div>
          </div>
          <div className="bg-[#F6F7F8] p-4 mt-8 rounded">
            <h2 className="mt-2 mb-5 uppercase text-[18px] font-semibold">
              Color
            </h2>
            <ColorOption colors={colors} />
          </div>
          <div className="bg-[#F6F7F8] p-4 mt-8 rounded">
            <h2 className="mt-2 mb-5 uppercase text-[18px] font-semibold">
              Price
            </h2>
            <PriceRangeSlider />
          </div>
          <div className="bg-[#F6F7F8] p-4 mt-8 rounded flex justify-center items-center">
            <h2 className=" text-[14px] text-[#262626] uppercase font-semibold">
              More
            </h2>
          </div>
          <div>
            <a
              href={"/shop"}
              className="block w-full border p-2 mt-4 text-center bg-red-400 text-white hover:bg-red-500"
            >
              Reset All
            </a>
          </div>
        </div>
        <div className="md:col-span-2 lg:col-span-3 ">
          <div className="w-full hidden h-[340px] md:h-[319px] lg:h-[340px] bg-[#2E90E5] rounded sm:flex justify-between items-center">
            <div className="w-[50%] p-16 md:p-6 lg:px-16 flex flex-col gap-5 ">
              <h1 className="text-[42px] text-white ">iPhone 8</h1>
              <span className="text-[16px] text-white tracking-[0.4]">
                Performance and design. Taken right to the edge.
              </span>
              <div>
                <Link
                  href={"#"}
                  className="border-b-[3px] pb-1  border-white uppercase inline font-bold text-white"
                >
                  Shop now
                </Link>
              </div>
            </div>
            <div className="w-[50%] md:w-[100%] lg:w-[50%] ">
              {/* <img className="w-full"  src={iPhoneImage} alt="" /> */}
              <Image src={iPhoneImage} alt="iPhone" />
            </div>
          </div>
          {children}
        </div>
      </div>
      {/* {children} */}
    </div>
  );
};

export default Layout;
