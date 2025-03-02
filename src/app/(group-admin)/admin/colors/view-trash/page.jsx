import { getColorTrash } from "@/app/library/api-calls";
import { timeAgo } from "@/app/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import PermanentalyDeleteBtn from "@/components/admin/PermanentalyDeleteBtn";
import RestoreBtn from "@/components/admin/RestoreBtn";
import Link from "next/link";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const ColorTrash = async() => {
  const colors = await getColorTrash();
  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Colors"]}
        title={"Back to view"}
        url={"/admin/colors"}
        trashUrl={"/admin/colors/add-color"}
        viewTrash={"/admin/colors/view-trash"}
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
              Created At
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
                key={index}
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
                  {timeAgo(color.createdAt)}
                </td>
                <td className="p-2 flex gap-4">
                  <PermanentalyDeleteBtn url={`/color/delete/${color._id}`} />
                  <RestoreBtn url={`/color/restore/${color._id}`} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ColorTrash;
