"use client";

import { useEffect, useState } from "react";

// Define the order interface with additional details
interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  amountTotal: number;
  currency: string;
  paymentStatus: string;
  sessionStatus: string; // Include the session status
  paymentMethod: string;
  billingAddress: string;
  shippingName: string;
  shippingAddress: string;
  shippingCost: number;
  items: { description: string; unitPrice: number; quantity: number }[];
  created: number; // Unix timestamp of when the order was created
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        // Fetch all orders from the Stripe API endpoint
        const response = await fetch("/api/orders/fetch-from-stripe");
        const data = await response.json();

        // Check if the data is an array
        if (!Array.isArray(data)) {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format received from server.");
          return;
        }

        // Map and format data to match the order structure, and add the created timestamp
        const formattedOrders = data.map((session: any) => {
          const paymentIntent = session.payment_intent || {};
          const billingDetails =
            paymentIntent.charges?.data[0]?.billing_details || {};
          const shippingDetails = paymentIntent.shipping || {};

          return {
            id: session.id,
            customerEmail: session.customer_details?.email || "N/A",
            customerName: session.customer_details?.name || "N/A",
            amountTotal: session.amount_total || 0,
            currency: session.currency || "usd",
            paymentStatus: session.payment_status || "unknown",
            sessionStatus: session.status || "unknown", // Capture session status
            paymentMethod: session.payment_method_types?.[0] || "unknown",
            billingAddress: formatAddress(billingDetails.address),
            shippingName: shippingDetails.name || "N/A",
            shippingAddress: formatAddress(shippingDetails.address),
            shippingCost: session.shipping_cost?.total_amount || 0,
            items: (session.line_items?.data || []).map((item: any) => ({
              description: item.description || "No description",
              unitPrice: item.price?.unit_amount || 0,
              quantity: item.quantity || 1,
            })),
            created: session.created || 0, // Add created timestamp
          };
        });

        // Sort the formatted orders by date (latest first)
        formattedOrders.sort((a: any, b: any) => b.created - a.created);

        setOrders(formattedOrders);
        setFilteredOrders(formattedOrders); // Initially show all orders
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch orders";
        console.error("Error fetching orders:", errorMessage);
        setError("Failed to fetch orders. Please try again later.");
      }
    }

    fetchOrders();
  }, []);

  // Function to format address safely with checks for missing fields
  const formatAddress = (address: any) => {
    if (!address || (!address.line1 && !address.city && !address.country))
      return "N/A";
    const {
      line1 = "",
      city = "",
      state = "",
      postal_code = "",
      country = "",
    } = address;
    const formattedAddress = [line1, city, state, postal_code, country]
      .filter((part) => part && part.trim()) // Filter out empty parts
      .join(", ");
    return formattedAddress || "N/A";
  };

  // Function to filter orders by status
  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    if (status === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.sessionStatus === status)
      );
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["all", "open", "complete", "expired"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => handleFilterChange(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-2">
                {order.customerName}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Order Date:</strong>{" "}
                {order.created
                  ? new Date(order.created * 1000).toLocaleString()
                  : "Date not available"}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {order.customerEmail}
              </p>
              <p className="mb-2">
                <strong>Amount:</strong> {order.amountTotal / 100}{" "}
                {order.currency.toUpperCase()}
              </p>
              <p className="mb-2">
                <strong>Payment Status:</strong>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    order.paymentStatus === "paid"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
              <p className="mb-2">
                <strong>Session Status:</strong> {order.sessionStatus}
              </p>
              <p className="mb-2">
                <strong>Billing Address:</strong> {order.billingAddress}
              </p>
              <p className="mb-2">
                <strong>Shipping Address:</strong> {order.shippingAddress}
              </p>
              <p className="mb-2">
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p className="mb-4">
                <strong>Items:</strong>
                <div className="grid grid-cols-1 gap-4 mt-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow-inner border border-gray-200"
                    >
                      <p className="mb-1">
                        <strong>Description:</strong> {item.description}
                      </p>
                      <p className="mb-1">
                        <strong>Unit Price:</strong> {item.unitPrice / 100}{" "}
                        {order.currency.toUpperCase()}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
