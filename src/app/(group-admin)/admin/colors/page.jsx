import { getColors } from "@/app/library/api-calls";
import { formatDate } from "@/app/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import ToggleStatus from "@/components/admin/ToggleStatus";
import Link from "next/link";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const ColorTable = async() => {
  const colors = await getColors();
  console.log("colors")
  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Colors"]}
        title={"Add"}
        url={"/admin/colors/add-color"}
        viewTrash={"/admin/colors/view-trash"}
        trashUrl={"/admin/colors/add-color"}
      />
      <table className="w-full border border-gray-400 rounded-lg leading-normal overflow-hidden shadow-md">
        <thead className="border-b border-gray-400 bg-[#f3f5f7]">
          <tr>
            <th className="p-2 py-3 text-start" scope="col">
              S.No
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Color Name
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Hex Code
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Status
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Created At
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Updated At
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {colors.length === 0 ? (
            <tr className="text-center w-full">
              <td
                colSpan="5"
                className="py-2 text-xl font-semibold text-gray-600"
              >
                List is empty...
              </td>
            </tr>
          ) : (
            colors.map((color, index) => (
              <tr
                key={color._id}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2 flex items-center gap-2">
                  <span
                    className="inline-block w-5 h-5 rounded-full"
                    style={{ backgroundColor: color.hxcode }}
                  ></span>
                  {color.name}
                </td>
                <td className="p-2">{color.hxcode}</td>
                <td className="p-2">
                <ToggleStatus
                    current_status={color.status}
                    url={`/color/toggle-status/${color._id}`}
                  />
                </td>
                <td className="p-2">
                  {formatDate(color.createdAt)}
                </td>
                <td className="p-2">
                  {formatDate(color.updatedAt)}
                </td>
                <td className="p-2 flex gap-4">
                  <DeleteBtn url={`/color/color-trash/${color._id}`} />
                  <Link href={`/admin/colors/edit-color/${color._id}`}
                    title="Edit"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaPencilAlt />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ColorTable;
