"use client";
import React, { useEffect, useState } from "react";
import CartButton from "./CartButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ProductCard = ({
  name,
  image,
  original_price,
  discounted_price,
  color,
  _id,
}) => {
  const searchParams = useSearchParams();
  const [productView, setProductView] = useState("grid");

  useEffect(() => {
    const view_value = searchParams.get("view");
    if (view_value) {
      setProductView(view_value);
    }
  }, [searchParams]);

  return (
    <div
      className={`border rounded-lg shadow-md p-4 transition duration-200 ${
        productView === "grid"
          ? "w-full"
          : "w-full flex items-center p-6 flex-row"
      } ${productView === "list" ? "w-full" : ""}`}
    >
      <Link href={`/product-details/${_id}`}>
        <div
          className={`${
            productView === "grid"
              ? "flex justify-center"
              : "flex-shrink-0 w-32 h-32"
          }`}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/accessory/${image}`}
            alt={image}
            className={`${
              productView === "grid"
                ? " h-[110px] hover:scale-[1.05]"
                : "w-full h-full object-cover rounded-lg"
            }`}
          />
        </div>
      </Link>

      <div className={productView === "list" ? "ml-6 flex-1" : "text-center"}>
        <Link href={`/product-details/${_id}`}>
          <h3 className="text-lg font-semibold mt-4 !text-[14px]">{name}</h3>
        </Link>

        <div className={`flex ${productView == "list" ? "justify-start" : "justify-center"} mt-2`}>
          <div className="flex space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-gray-300">★</span>
          </div>
        </div>

        <div
          className={`flex ${
            productView === "grid" ? "justify-center" : "justify-start"
          } items-center mt-4 space-x-2`}
        >
          <span className="text-red-500 font-bold text-lg">
            ${discounted_price}
          </span>
          <span className="line-through text-gray-500 text-sm">
            ${original_price}
          </span>
        </div>

        <CartButton
          prices={{ original_price, discounted_price }}
          colors={color}
          product_id={_id}
        />
      </div>
    </div>
  );
};

export default ProductCard;
