import { getAllUsers } from "@/app/library/api-calls";
import { timeAgo } from "@/app/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import ToggleStatus from "@/components/admin/ToggleStatus";
import Link from "next/link";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const WebsiteUsers = async () => {
  const users = await getAllUsers();

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Website Users"]}
        title={"Add"}
        url={"/admin/categories/add-category"}
        trashUrl={"/admin/categories/add-category"}
        viewTrash={"/admin/website-users/view-trash"}
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
          {users.length === 0 ? (
            <tr className="text-center w-full">
              <td
                colSpan="6"
                className="py-2 text-xl font-semibold text-gray-600"
              >
                No users!
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{user?.name}</td>
                <td className="p-2">{user?.email}</td>
                <td className="p-2">
                  <ToggleStatus
                    current_status={user?.status}
                    url={`/user/toggle-status/${user._id}`}
                  />
                </td>
                <td className="p-2">{timeAgo(user?.createdAt)}</td>
                <td className="p-2 flex gap-4">
                  <DeleteBtn url={`/user/move-to-trash/${user?._id}`} />
                  <Link
                    href={`/admin/website-users/edit-user/${user?._id}`}
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

export default WebsiteUsers;
