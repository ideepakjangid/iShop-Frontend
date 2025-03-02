"use client";
import { getProducts } from "@/app/library/api-calls";
import ProductCard from "@/components/website/ProductCard";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const url = useParams();
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    const response = await getProducts(
      url.category_slug,
      null,
      null,
      null,
      null,
      8
    );
    if (response.flag == 1) {
      setProducts(response.products);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto my-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
      {products.map((product, index) => {
        return <ProductCard key={index} {...product} />;
      })}
    </div>
  );
};

export default Page;
