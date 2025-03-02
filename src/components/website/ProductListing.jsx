import React from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/app/library/api-calls";

const ProductListing = async () => {
  const products = await getProducts();
  return (
    <div>
      <div className=" w-full grid grid-cols-3 gap-6 mt-6">
        {products.map((product) => {
          return <ProductCard key={product._id} {...product} />;
        })}
      </div>
      <div className="max-w-full mt-6 bg-[#FAFAFB] flex justify-center ">
        <div className="p-4 font-bold hover:bg-black hover:text-white cursor-pointer">1</div>
        <div className="p-4 font-bold hover:bg-black hover:text-white cursor-pointer">2</div>
        <div className="p-4 font-bold hover:bg-black hover:text-white cursor-pointer">3</div>
        <div className="p-4 font-bold hover:bg-black hover:text-white cursor-pointer">4</div>
      </div>
    </div>
  );
};

export default ProductListing;
