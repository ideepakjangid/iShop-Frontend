import {  getTrashProducts } from "@/app/library/api-calls";
import { timeAgo } from "@/app/library/helper";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import PermanentalyDeleteBtn from "@/components/admin/PermanentalyDeleteBtn";
import RestoreBtn from "@/components/admin/RestoreBtn";
import ToggleStatus from "@/components/admin/ToggleStatus";
import React from "react";

const Product = async () => {
  const products = await getTrashProducts();
  console.log("Trash Product:",products)


  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Product", "Trash"]}
        title={"Back to view"}
        url={"/admin/products"}
        trashUrl={"/admin/products/add-category"}
        viewTrash={"/admin/products/view-trash"}
      />
      <table className="w-full border border-gray-400 rounded-lg leading-normal overflow-hidden shadow-md">
        <thead className="border-b border-gray-400 bg-[#f3f5f7]">
          <tr>
            <th className="p-2 py-3 text-start" scope="col">
              S.No
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Name/Slug
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Image
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Original Price/Discounted Price
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Category
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Colors
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Status
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              TimeStamp
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody >
          {products.length === 0 ? (
            <tr className="text-center w-full">
              <td
                colSpan="8"
                className="py-2 text-xl font-semibold text-gray-600"
              >
                List is empty...
              </td>
            </tr>
          ) : (
            products?.map((product, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  {product.name} <br /> {product.slug}
                </td>
                <td className="p-2">
                  <img width={70} height={70} src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/products/${product.image}`} alt="" />
                </td>
                <td className="p-2">
                 <del> {product.original_price} </del> {product.discounted_price} {product.discount_percent}
                </td>
                <td className="p-2">{product.category.name}</td>
                <td className="p-2">
                  <ul>
                    {product?.color?.map((color, index) => {
                      return <li key={index}>{color.name}</li>;
                    })}
                  </ul>
                </td>
                <td className="p-2">
                  <ToggleStatus
                    current_status={product.status}
                    url={`/product/toggle-status/${product._id}`}
                  />
                </td>
                <td className="p-2 text-[12px]"><span className="font-bold">CreatedAt:</span>{timeAgo(product.createdAt)} <br /><span className="font-bold">UpdatedAt:</span> {timeAgo(product.updatedAt)} </td>
                <td className="p-2 ">
                  <span className="flex gap-4">
                  <RestoreBtn url={`/product/restore/${product._id}`} />
                  <PermanentalyDeleteBtn url={`/product/delete/${product._id}`}  />
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
