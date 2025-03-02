"use client"
import { useState } from "react";
import FavoriteIcon from '@/assest/images/favorite_icon.png'
import FillCart from "@/assest/images/fill_cart.png"
import Image from "next/image";
import Link from "next/link";


const ProductCard = ({name,original_price,_id,discounted_price,image}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
   <Link href={`/product-details/${_id}`}>
    <div
      className="relative max-w-64 p-4 bg-white shadow-lg rounded transition-all duration-300 hover:shadow-2xl border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/** Hot Badge */}
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
        HOT
      </span>

      {/** Product Image */}
      <div className="relative w-full h-40 flex items-center justify-center">
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/products/${image}`}
          alt={name}
          className={`w-full h-auto rounded-lg transition-all duration-300 ${
            isHovered ? "opacity-20" : "opacity-100"
          }`}
        />

        {/** Hover Actions */}
        {isHovered && (
          <div className="absolute flex space-x-4">
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
             <Image src={FavoriteIcon} width={30} alt="Favorite_Icon" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
              <Image src={FillCart} width={30} alt="Fill_Cart" />
            </button>
          </div>
        )}
      </div>

      {/** Product Details */}
      <div className="text-center mt-8">
        <h3 className="text-[14px] font-semibold mb-4">{name}</h3>

        {/** Ratings */}
        <div className="flex justify-center space-x-1 my-1 text-yellow-400 text-[10px]">
          <span>⭐</span> <span>⭐</span> <span>⭐</span> <span>⭐</span>
          <span className="text-gray-400">⭐</span>
        </div>

        {/** Price */}
        <div className="text-red-500 text-lg font-bold">
          ${discounted_price} <span className="text-gray-400 line-through text-sm">${original_price}</span>
        </div>
      </div>
    </div>
   </Link>
  );
};

export default ProductCard;
