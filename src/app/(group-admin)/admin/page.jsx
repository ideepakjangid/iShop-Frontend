import React from 'react';
import { FaChartLine, FaShoppingCart, FaUsers, FaBoxOpen } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="flex justify-between items-center py-4">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <FaChartLine className="text-3xl text-blue-500" />
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-700">Sales</h2>
                        <p className="text-gray-500">$12,000</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <FaShoppingCart className="text-3xl text-green-500" />
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-700">Orders</h2>
                        <p className="text-gray-500">150</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <FaUsers className="text-3xl text-purple-500" />
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-700">Customers</h2>
                        <p className="text-gray-500">1,200</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <FaBoxOpen className="text-3xl text-yellow-500" />
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-700">Products</h2>
                        <p className="text-gray-500">300</p>
                    </div>
                </div>
            </main>
            <section className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
                                <th className="px-4 py-2 text-left text-gray-600">Customer</th>
                                <th className="px-4 py-2 text-left text-gray-600">Date</th>
                                <th className="px-4 py-2 text-left text-gray-600">Total</th>
                                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">#12345</td>
                                <td className="border px-4 py-2">John Doe</td>
                                <td className="border px-4 py-2">2023-10-01</td>
                                <td className="border px-4 py-2">$150.00</td>
                                <td className="border px-4 py-2 text-green-500">Completed</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">#12346</td>
                                <td className="border px-4 py-2">Jane Smith</td>
                                <td className="border px-4 py-2">2023-10-02</td>
                                <td className="border px-4 py-2">$200.00</td>
                                <td className="border px-4 py-2 text-yellow-500">Pending</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">#12347</td>
                                <td className="border px-4 py-2">Bob Johnson</td>
                                <td className="border px-4 py-2">2023-10-03</td>
                                <td className="border px-4 py-2">$300.00</td>
                                <td className="border px-4 py-2 text-red-500">Cancelled</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;