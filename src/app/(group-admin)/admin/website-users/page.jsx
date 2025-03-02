import { getAllUsers } from "@/app/library/api-calls";
import { timeAgo } from "@/app/library/helper";
import PermanentalyDeleteBtn from "@/components/admin/PermanentalyDeleteBtn";
import ToggleStatus from "@/components/admin/ToggleStatus";
import Link from "next/link";
import React from "react";

const WebsiteUsers = async () => {
  const users = await getAllUsers();

  return (
    <div className="mt-8 px-5">
       <div className="flex justify-between items-center my-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            {["Dashboard", "Website Users"].map((paths, index) => {
              return (
                <li key={index} className="inline-flex items-center">
                  <Link
                    href={index == 0 ? '/admin' : `/admin/${paths.toLowerCase()}`}
                    className={`inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white ${
                      index == ["Dashboard", "Website Users"].length - 1 && "text-blue-600"
                    }`}
                  >
                    {index == 0 ? (
                      <svg
                        className="w-3 h-3 me-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                      </svg>
                    ) : (
                      <svg
                        className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    )}
                    {paths}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
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
              Contact
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
                <td className="p-2">+91-{user?.contact}</td>
                <td className="p-2">
                  <ToggleStatus
                    current_status={user?.status}
                    url={`/user/toggle-status/${user._id}`}
                  />
                </td>
                <td className="p-2">{timeAgo(user?.createdAt)}</td>
                <td className="p-2 flex  gap-4">
                <PermanentalyDeleteBtn
                      url={`/user/delete/${user._id}`}
                    />
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
