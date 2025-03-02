"use client"
import { getProductById } from "@/app/library/api-calls";
import CartButton from "@/components/website/CartButton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaRegHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default  function ProductDetails() {
    const params = useParams();
  const product_id = params?.product_id;
  const [product,setProduct] = useState([]);
  
  const getData = async()=>{
      
      const product = await getProductById(product_id);
      setProduct(product)
  }

  useEffect(
    ()=>{
        getData();
    },[]
  )

  const [mainImage, setMainImage] = useState(product?.image); // State for Main Image

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Product Images Section */}
        <div>
          <div className="w-full border p-2 border-gray-300 rounded-lg overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/products/${product?.image}`}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 p-2">
            {product?.other_images &&
              [product.image, ...product.other_images].map((img, index) => (
                <img
                  key={index}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/products/${img}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-20 rounded-lg border p-1 cursor-pointer object-cover ${
                    mainImage === img ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div>
          <h1 className="text-2xl font-semibold">{product?.name}</h1>
          <p className="text-gray-500 text-sm">Category: {product?.category?.name || "Unknown"}</p>

          {/* Pricing */}
          <div className="flex items-center gap-3 my-3">
            <span className="text-2xl font-bold text-blue-600">${product?.discounted_price}</span>
            <span className="text-gray-400 line-through">${product?.original_price}</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              {product?.discount_percent} OFF
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
            <FaRegHeart />
          </div>

          {/* Stock Availability */}
          <p className={`mt-3 font-semibold ${product?.stock ? "text-green-500" : "text-red-500"}`}>
            {product?.stock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Color Selection */}
          {product?.color?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Available Colors:</h3>
              <div className="flex gap-2">
                {product?.color.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border-2`}
                    style={{ backgroundColor: color.slug }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="mt-2 text-gray-600">
            {product?.des || "No description available for this product."}
          </p>

          {/* Buttons */}
          <div className="max-w-[400px]">
            {/* <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <FaShoppingCart /> Add to Cart
            </button> */}
            <CartButton colors={product?.color} product_id={product?._id} prices={{original_price:product?.original_price,discounted_price:product?.discounted_price}} />
          </div>
        </div>
      </div>
    </div>
  );
}
