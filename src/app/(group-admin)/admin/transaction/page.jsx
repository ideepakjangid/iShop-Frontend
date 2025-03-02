"use client";
import {
  axiosInstance,
  capitalizeWords,
  formatDate,
  getKeyByValue,
} from "@/app/library/helper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Default styles
import "react-date-range/dist/theme/default.css"; // Theme
import { format } from "date-fns";

const Transaction = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: null,
    orderId: "",
    transactionId: "",
    name: "",
    email: "",
    status: "",
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
    setFilters({
      ...filters,
      dateRange: {
        startDate: format(ranges.selection.startDate, "yyyy-MM-dd"),
        endDate: format(ranges.selection.endDate, "yyyy-MM-dd"),
      },
    });
  };


  const generatePDF = (transaction) => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(14);
    doc.text("Transaction Receipt", 20, 10);
    doc.text(`Transaction ID: ${transaction._id}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${transaction.user_id.name}`, 20, 30);
    doc.text(`Email: ${transaction.user_id.email}`, 20, 35);
    doc.text(`Contact: ${transaction.user_id.contact}`, 20, 40);
    doc.text(`Order ID: ${transaction.order_id._id}`, 20, 45);
    doc.text(`Total: $${transaction.order_id.final_total}`, 20, 50);
    doc.text(
      `Status: ${payment_status[transaction.order_id.payment_status]}`,
      20,
      55
    );
    doc.save("transaction.pdf");
  };

  const fetchData = async () => {
    const response = await axiosInstance.get("/transaction");
    setTransactions(response.data.transactions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value.trim() });
  };

  const payment_status = {
    1: "Pending",
    2: "Success",
    3: "Failed",
    4: "Refund Init",
    5: "Refunded",
  };
  const searchHandler = async () => {
    setShowCalendar(false);
    const searchQuery = new URLSearchParams();
    if (filters.orderId) searchQuery.append("order_id", filters.orderId);
    if (filters.transactionId)
      searchQuery.append("transaction_id", filters.transactionId);
    if (filters.name) searchQuery.append("name", capitalizeWords(filters.name));
    if (filters.email) searchQuery.append("email", filters.email.toLowerCase());
    if (filters.status)
      searchQuery.append(
        "status",
        getKeyByValue(payment_status, filters.status)
      );
    if (filters.dateRange) {
      searchQuery.append("startDate", filters.dateRange.startDate);
      searchQuery.append("endDate", filters.dateRange.endDate);
    }

    const queryString = searchQuery.toString();
    console.log("Query String:", queryString);
    const response = await axiosInstance.get(`/transaction?${queryString}`);
    setTransactions(response.data.transactions);
  };

  return (
    <div className="mt-8 px-5">
      <div className="grid grid-cols-3 gap-4 bg-gray-100 p-4 rounded mb-6 relative">
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          className="p-2 border rounded"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="transactionId"
          placeholder="Transaction ID"
          className="p-2 border rounded"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="p-2 border rounded"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="p-2 border rounded"
          onChange={handleFilterChange}
        />
        <select
          name="status"
          className="p-2 border rounded"
          onChange={handleFilterChange}
        >
          <option value="">Select Payment Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
        </select>

        {/* Date Range Picker */}
        <div className="relative">
          <button
            className="p-2 border rounded bg-white w-full text-left"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {`${format(dateRange[0].startDate, "yyyy-MM-dd")} to ${format(
              dateRange[0].endDate,
              "yyyy-MM-dd"
            )}`}
          </button>
          {showCalendar && (
            <div className="absolute z-50 bg-white shadow-md p-2 mt-2">
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={searchHandler}
            className="bg-blue-500 text-white p-2 rounded w-fit"
          >
            Search
          </button>
        </div>
      </div>

      <table className="w-full border border-gray-400 rounded-lg leading-normal overflow-hidden shadow-md">
        <thead className="border-b border-gray-400 bg-[#f3f5f7] text-[13px]">
          <tr>
            <th className="p-2 py-3 text-start" scope="col">
              S.No
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Transaction
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Customer
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Amount
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Status
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Payment ID
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Date
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Download
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions?.length === 0 ? (
            <tr className="text-center w-full">
              <td
                colSpan="8"
                className="py-2 text-[13px] font-semibold text-gray-600"
              >
                No transactions!
              </td>
            </tr>
          ) : (
            transactions?.map((transaction, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 text-[12px] hover:bg-gray-100"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <span className="text-gray-950 font-bold">
                    Transaction ID:
                  </span>{" "}
                  {transaction?._id}
                  <br />
                  <span className="text-gray-950 font-bold">
                    Order ID:
                  </span>{" "}
                  {transaction?.order_id?._id}
                </td>
                <td className="p-2">
                  <span className="text-gray-950 font-bold">
                    {transaction?.user_id?.name}
                  </span>
                  <br />
                  {transaction?.user_id?.email}
                  <br />
                  +91-{transaction?.user_id?.contact}
                </td>
                <td className="p-2">${transaction?.order_id?.final_total}</td>
                <td className="p-2">
                  {payment_status[transaction?.order_id?.payment_status]}
                </td>
                <td className="p-2">{transaction?.razorpay_payment_id}</td>
                <td className="p-2">{formatDate(transaction?.createdAt)}</td>
                <td className="p-2 ">
                  <FaDownload
                    onClick={() => generatePDF(transaction)}
                    className="cursor-pointer"
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

export default Transaction;
