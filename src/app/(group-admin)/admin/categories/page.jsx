import { getCategories } from "@/app/library/api-calls";
import { formatDate } from "@/app/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ItemsToShowSelector from "@/components/admin/ItemsToShowSelector";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import ToggleStatus from "@/components/admin/ToggleStatus";
import Pagination from "@/components/website/Pagination";
import Link from "next/link";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const Categories = async ({searchParams}) => {
  const {page,limit} = await searchParams;
  let Page = page || null;
  let Limit = limit ?? 5;
  const response = await getCategories(Page, Limit);

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Categories"]}
        title={"Add"}
        url={"/admin/categories/add-category"}
        trashUrl={"/admin/categories/add-category"}
        viewTrash={"/admin/categories/view-trash"}
      />
      <ItemsToShowSelector />
      <table className="w-full border border-gray-400 rounded-lg leading-normal overflow-hidden shadow-md">
        <thead className="border-b border-gray-400 bg-[#f3f5f7]">
          <tr>
            <th className="p-2 py-3 text-start" scope="col">
              S.No
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Name
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Slug
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Status
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Created At
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {response?.categories.length === 0 ? (
            <tr className="text-center w-full">
              <td
                colSpan="6"
                className="py-2 text-xl font-semibold text-gray-600"
              >
                List is empty...
              </td>
            </tr>
          ) : (
            response?.categories.map((category, index) => (
              <tr
                key={category._id}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{category.name}</td>
                <td className="p-2">{category.slug}</td>
                <td className="p-2">
                  <ToggleStatus
                    current_status={category.status}
                    url={`/category/toggle-status/${category._id}`}
                  />
                </td>
                <td className="p-2">{formatDate(category.createdAt)}</td>
                <td className="p-2 flex gap-4">
                  <DeleteBtn url={`/category/move-to-trash/${category._id}`} />
                  <Link
                    href={`/admin/categories/edit-category/${category._id}`}
                  >
                    <FaPencilAlt title="Edit" />
                  </Link>
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

export default Categories;
