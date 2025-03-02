import { getOrders } from "@/app/library/api-calls";
import { formatDate } from "@/app/library/helper";
import ItemsToShowSelector from "@/components/admin/ItemsToShowSelector";
import Pagination from "@/components/website/Pagination";
import Link from "next/link";
import React from "react";

const Orders = async ({searchParams}) => {
  const {page,limit} = await searchParams;
  let Page = page ?? null;
  let Limit = limit ?? 5;
  const response = await getOrders(Page,Limit);
  console.log("Response is",response)

  const payment_status = {
    1: "Pending", //1:Pending 2:Success 3:Failed 4:Refund inti 5:Refunded
    2: "Success",
    3: "Failed",
    4: "Refund Init",
    5: "Refunded",
  };

  const order_status = {
    0: "Pending", //0:Pending 1:Ordre placed 2:Order Packed 3:Order Dispatched 4:Order Shippped 5:Out for delivery 6:Delivered
    1: "Placed",
    2: "Packed",
    3: "Dispatched",
    4: "Shipped",
    5: "OFD",
    6: "Delivered",
  };

  return (
    <div className="mt-8 px-5">
      <div className="flex justify-between items-center my-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            {["Dashboard", "Orders"].map((paths, index) => {
              return (
                <li key={index} className="inline-flex items-center">
                  <Link
                    href={index == 0 ? '/admin' : `/admin/${paths.toLowerCase()}`}
                    className={`inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white ${
                      index == ["Dashboard", "Orders"].length - 1 &&
                      "text-blue-600"
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
      <ItemsToShowSelector />
      <table className="w-full border border-gray-400 rounded-lg leading-normal overflow-hidden shadow-md">
        <thead className="border-b border-gray-400 text-[13px] bg-[#f3f5f7]">
          <tr>
            <th className="p-2 py-3 text-start" scope="col">
              S.No
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Order ID
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Customer
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Quantity
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Total
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Mode
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Payment Status
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Status
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {response.orders.length === 0 ? (
            <tr className="text-center w-full">
              <td
                colSpan="6"
                className="py-2 text-xl font-semibold text-gray-600"
              >
                No orders!
              </td>
            </tr>
          ) : (
            response.orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 text-[12px] hover:bg-gray-100"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{order?._id}</td>
                <td className="p-2">
                  <span className="text-gray-950 font-bold">
                    {order?.user_id?.name}
                  </span>
                  <br />
                  {order?.user_id?.email}
                  <br />
                  +91-{order?.user_id?.contact}
                </td>
                <td className="p-2">{order?.products?.length}</td>
                <td className="p-2">$ {order?.final_total}</td>
                <td className="p-2">
                  {order?.payment_method == 1 ? "COD" : "Razorpay"}
                </td>
                <td className="p-2">{payment_status[order?.payment_status]}</td>
                <td className="p-2">{order_status[order?.order_status]}</td>
                <td className="p-2">{formatDate(order?.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination response={response} />
    </div>
  );
};

export default Orders;
