import { getTrashCategories } from "@/app/library/api-calls";
import { formatDate } from "@/app/library/helper";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import PermanentalyDeleteBtn from "@/components/admin/PermanentalyDeleteBtn";
import RestoreBtn from "@/components/admin/RestoreBtn";
import ToggleStatus from "@/components/admin/ToggleStatus";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const Categories = async () => {
  const categories = await getTrashCategories();

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Categories", "Trash"]}
        title={"Back to view"}
        url={"/admin/categories"}
        trashUrl={"/admin/categories/add-category"}
        viewTrash={"/admin/categories/view-trash"}
      />
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
              Deleted At
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr className="text-center w-full">
              <td
                colSpan="6"
                className="py-2 text-xl font-semibold text-gray-600"
              >
                List is empty...
              </td>
            </tr>
          ) : (
            categories.map((category, index) => (
              <tr
                key={index}
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
                <td className="p-2">{formatDate(category.deletedAt)}</td>
                <td className="p-2 ">
                  <span className="flex gap-4">
                    <RestoreBtn url={`/category/restore/${category._id}`} />
                    <PermanentalyDeleteBtn
                      url={`/category/delete/${category._id}`}
                    />
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

export default Categories;
