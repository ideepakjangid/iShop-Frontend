import { getAdminList} from "@/app/library/api-calls";
import { formatDate } from "@/app/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import ToggleStatus from "@/components/admin/ToggleStatus";
import Link from "next/link";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const AdminList = async () => {
  const admins = await getAdminList();

  const adminType = {
    1:"Super Admin",
    2:"Sub Admin",
    3:"Staff"
  }

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Admin List"]}
        title={"Add"}
        url={"/admin/admin-list/add-admin"}
        trashUrl={"/admin/admin-list/add-admin"}
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
              Contact No.
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Type
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Status
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Register
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-[13px]">
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
                <td className="p-2">+91-{admin.contact}</td>
                <td className="p-2">{adminType[admin.type]}</td>
                <td className="p-2">
                  <ToggleStatus
                    current_status={admin.status}
                    url={`/admin/toggle-status/${admin._id}`}
                  />
                </td>
                <td className="p-2">{formatDate(admin.createdAt)}</td>
                <td className="p-2 flex gap-4">
                  <DeleteBtn url={`/admin/move-to-trash/${admin._id}`} />
                  <Link
                    href={`/admin/admin-list/edit-admin/${admin._id}`}
                  >
                    <FaPencilAlt title="Edit" />
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

export default AdminList;
