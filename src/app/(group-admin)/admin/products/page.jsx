import { getProducts, getTrashProducts } from "@/app/library/api-calls";
import { timeAgo } from "@/app/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ImageGallery from "@/components/admin/ImageGallery";
import ItemsToShowSelector from "@/components/admin/ItemsToShowSelector";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import ToggleStatus from "@/components/admin/ToggleStatus";
import Pagination from "@/components/website/Pagination";
import Link from "next/link";
import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const Products = async ({ searchParams }) => {
  let Page = null;
  let Limit = 5;
  if (searchParams.page) {
    Page = searchParams.page;
  }
  if (searchParams.limit) {
    Limit = searchParams.limit;
  }

  const response = await getProducts(null, null, null, null, Page, Limit);

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Products"]}
        title={"Add"}
        url={"/admin/products/add-product"}
        trashUrl={"/admin/products/add-product"}
        viewTrash={"/admin/products/view-trash"}
      />
      <ItemsToShowSelector />
      <table className="w-full border border-gray-400 rounded-lg leading-normal overflow-hidden shadow-md">
        <thead className="border-b border-gray-400 bg-[#f3f5f7] text-[14px]">
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
              Price
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
        <tbody>
          {response?.products?.length === 0 ? (
            <tr className="text-center w-full">
              <td
                colSpan="8"
                className="py-2 text-xl font-semibold text-gray-600"
              >
                List is empty...
              </td>
            </tr>
          ) : (
            response.products.map((product, index) => (
              <tr
                key={product._id}
                className="border-b border-gray-300 hover:bg-gray-100 text-[13px]"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  {product.name} <br /> {product.slug}
                </td>
                <td className="p-2">
                  <img
                    width={70}
                    height={70}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/products/${product.image}`}
                    alt=""
                  />
                </td>
                <td className="p-2">
                  <span>Original Price:</span><del> {product.original_price} </del>{" "} <br />
                  <span>Discounted Price:</span>{product.discounted_price} <br /> <span>Discount:</span>{product.discount_percent}
                </td>
                <td className="p-2">{product.category.name}</td>
                <td className="p-2">
                  <ul>
                    {product.color.map((color, index) => {
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
                <td className="p-2 text-[12px]">
                  <span className="font-bold">CreatedAt:</span>
                  {timeAgo(product.createdAt)} <br />
                  <span className="font-bold">UpdatedAt:</span>{" "}
                  {timeAgo(product.updatedAt)}{" "}
                </td>
                <td className="p-2">
                  <span className="flex gap-3">
                    <DeleteBtn url={`/product/move-to-trash/${product._id}`} />

                    <Link href={`/admin/products/edit-product/${product._id}`}>
                      <FaPencilAlt title="Edit" />
                    </Link>

                    <ImageGallery
                      productImages={product.other_images}
                      id={product._id}
                    />
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination response={response} />
    </div>
  );
};

export default Products;
