import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default  function OrderPlaced({ params }) {
  const order_id =   params.order_id;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-4 text-center" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-2">
          Thank you for your purchase. Your order is being processed.
        </p>
        <p className="text-gray-800 font-semibold mb-4">Order ID: {order_id}</p>
        <Link href={'/'} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
