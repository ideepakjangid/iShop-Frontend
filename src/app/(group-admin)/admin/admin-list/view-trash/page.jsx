import { getTrashAdmins } from "@/app/library/api-calls";
import { formatDate } from "@/app/library/helper";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import PermanentalyDeleteBtn from "@/components/admin/PermanentalyDeleteBtn";
import RestoreBtn from "@/components/admin/RestoreBtn";
import ToggleStatus from "@/components/admin/ToggleStatus";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const Admins = async () => {
  const admins = await getTrashAdmins();

  const adminType = {
    1:"Super Admin",
    2:"Sub Admin",
    3:"Staff"
  }

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Admin List", "Trash"]}
        title={"Back to view"}
        url={"/admin/admin-list"}
        trashUrl={"/admin/admin-list/add-category"}
        viewTrash={"/admin/admin-list/view-trash"}
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
              Email
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Type
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
          {admins.length === 0 ? (
            <tr className="text-center w-full">
              <td
                colSpan="6"
                className="py-2 text-xl font-semibold text-gray-600"
              >
                List is empty...
              </td>
            </tr>
          ) : (
            admins.map((admin, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{admin.name}</td>
                <td className="p-2">{admin.email}</td>
                <td className="p-2">{adminType[admin.type]}</td>
                <td className="p-2">{formatDate(admin.deletedAt)}</td>
                <td className="p-2 ">
                  <span className="flex gap-4">
                    <RestoreBtn url={`/admin/restore/${admin._id}`} />
                    <PermanentalyDeleteBtn
                      url={`/admin/delete/${admin._id}`}
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

export default Admins;
