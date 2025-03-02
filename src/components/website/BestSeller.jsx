import Link from "next/link";
import React from "react";
import ProductCard from "./BestSellerProductCard";
import { getProducts } from "@/app/library/api-calls";
import { GoTriangleDown } from "react-icons/go";
const BestSeller = async() => {
  let limit = 8;
    const response = await getProducts(null, null,null,null,null,limit);
  return (
    <div className="max-w-[1100px] mx-auto py-12 flex flex-col items-center">
      <h1 className="text-center font-bold text-[#22262A] text-3xl">BEST SELLER</h1>
      {/* <div className="w-[70%] my-4 hidden sm:block ">
        <ul className=" flex justify-evenly items-center p-3 text-[14px] font-bold">
            <li className="pb-2 border-b-[3px] border-b-[#33A0FF] text-[#33A0FF]">All</li>
            <li className="pb-2 border-b-[3px] border-b-transparent">iPhone</li>
            <li className="pb-2 border-b-[3px] border-b-transparent">Mac</li>
            <li className="pb-2 border-b-[3px] border-b-transparent">iPad</li>
            <li className="pb-2 border-b-[3px] border-b-transparent">iPod</li>
            <li className="pb-2 border-b-[3px] border-b-transparent">Accessories</li>
        </ul>
      </div>
      <div className="w-full sm:hidden flex justify-center items-center my-4">
                  <div className="w-[80%] relative flex justify-center items-center font-bold bg-[#F8F8F8] py-4 ">
                        ALL
                        <GoTriangleDown className="absolute right-3" />
                  </div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:px-6 gap-8 mt-8">
        {
          response.products.map(
            (product,index)=>{
              return   <ProductCard key={index} {...product} />
            }
          )
        }
      
      
      </div>
    </div>
  );
};

export default BestSeller;



