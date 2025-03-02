"use client";
import { getProducts } from "@/app/library/api-calls";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const FeaturedProduct = () => {
  const [clickd, setClicked] = useState(0);
  const [products, setProducts] = useState([]);
  const [translateSize, setTranslateSize] = useState(260); // Default for desktop

  useEffect(() => {
    const updateTranslateSize = () => {
      if (window.innerWidth < 640) {
        setTranslateSize(256); // Mobile
      } else {
        setTranslateSize(260); // Desktop
      }
    };

    updateTranslateSize(); // Set on initial load
    window.addEventListener("resize", updateTranslateSize);
    return () => window.removeEventListener("resize", updateTranslateSize);
  }, []);

  const leftTranslateHandler = () => {
    if (clickd === 0) return;
    setClicked(clickd - 1);
  };

  const rightTranslateHandler = () => {
    if (Math.floor(products.length - 3) === clickd) return;
    setClicked(clickd + 1);
  };

  const getData = async () => {
    const response = await getProducts();
    setProducts(response.products);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto md:px-6 pb-24 flex flex-col items-center overflow-hidden">
      <h1 className="text-[26px] sm:text-[30px] font-bold mb-10">
        FEATURED PRODUCTS
      </h1>
      <div className="flex items-center gap-4">
        <FaAngleLeft
          onClick={leftTranslateHandler}
          className="text-3xl cursor-pointer z-10"
        />
        <div className="w-[240px] md:w-[500px] lg:w-[760px] flex items-center gap-8 py-4 px-1 overflow-hidden">
          {products.map((product, index) => (
            <Link key={index} href={`/product-details/${product._id}`}>
              <div
                style={{
                  transform: `translateX(${-translateSize * clickd}px)`,
                }}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md transition duration-300 ease-linear"
              >
                <div className="w-20 h-20">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/products/${product.image}`}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="w-[100px] whitespace-nowrap overflow-hidden text-ellipsis text-md font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <div className="flex space-x-1 text-yellow-500 text-[10px] my-1">
                    <span>⭐</span> <span>⭐</span> <span>⭐</span>{" "}
                    <span>⭐</span>
                    <span className="text-gray-400">⭐</span>
                  </div>
                  <div className="text-red-500 text-[12px] leading-none mt-1 text-lg font-bold">
                    <span>${product.discounted_price}</span>
                    <br />
                    <span className="text-gray-400 text-[9px] line-through text-sm">
                      ${product.original_price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <FaAngleRight
          onClick={rightTranslateHandler}
          className="text-3xl cursor-pointer z-10"
        />
      </div>
    </div>
  );
};

export default FeaturedProduct;
