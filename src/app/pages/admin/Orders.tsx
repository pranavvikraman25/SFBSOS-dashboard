import { useState } from "react";
import { Phone, X, Printer, Check, Clock, MapPin } from "lucide-react";
import { useOrders } from "../../context/OrderContext";

type OrderFilter = "all" | "pending" | "packing" | "ready" | "delivery" | "delivered" | "cancelled";

function getTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

export function Orders() {
  const { orders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState<OrderFilter>("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-red-100 text-red-700";
      case "packing": return "bg-blue-100 text-blue-700";
      case "ready": return "bg-amber-100 text-amber-700";
      case "delivery": return "bg-purple-100 text-purple-700";
      case "delivered": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getNextAction = (status: string) => {
    switch (status) {
      case "pending": return { label: "Accept & Pack", next: "packing" as const };
      case "packing": return { label: "Mark Ready", next: "ready" as const };
      case "ready": return { label: "Dispatch", next: "delivery" as const };
      case "delivery": return { label: "Mark Delivered", next: "delivered" as const };
      default: return null;
    }
  };

  const formatItems = (items: typeof orders[0]["items"]) =>
    items.map((i) => `${i.fruit} ${i.qty}${i.unit}`).join(", ");

  const downloadBill = (order: typeof orders[0]) => {
    const itemLines = order.items
      .map((i) => `${i.fruit.padEnd(16)}${String(i.qty + " " + i.unit).padEnd(10)}₹${i.rate.toString().padEnd(8)}₹${i.total}`)
      .join("\n");

    const billContent = `
================================================
         SFBSOS FRUIT SHOP
         42, Main Street, Kavaraipettai
         Phone: +91 98421 00000
         GSTIN: 33AABCS1234A1Z5
================================================
INVOICE #SFBSOS-${order.id}
Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}
Time: ${new Date(order.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
------------------------------------------------
Bill To:
  ${order.customer}
  ${order.phone}
  ${order.address || "Store Pickup"}
${order.notes ? `Notes: ${order.notes}` : ""}
------------------------------------------------
ITEM            QTY       RATE      AMOUNT
${itemLines}
------------------------------------------------
Subtotal:                          ₹${order.subtotal}${order.deliveryCharge > 0 ? `\nDelivery Charge:                   ₹${order.deliveryCharge}` : ""}
------------------------------------------------
GRAND TOTAL:                       ₹${order.total}
Payment Mode: ${order.paymentMethod}
------------------------------------------------
Thank you for your business!
Visit sfbsos-dashboard.vercel.app
================================================
    `.trim();

    const blob = new Blob([billContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bill-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleStatusUpdate = (orderId: string, status: typeof orders[0]["status"]) => {
    updateOrderStatus(orderId, status);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => prev ? { ...prev, status } : null);
    }
  };

  const handleReject = (orderId: string) => {
    updateOrderStatus(orderId, "cancelled");
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incoming Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Live orders from customer website</p>
        </div>
        {pendingCount > 0 && (
          <div className="px-4 py-2 bg-red-100 border border-red-200 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-red-700">{pendingCount} pending</span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex overflow-x-auto">
          {[
            { id: "all", label: "All Orders", count: orders.length },
            { id: "pending", label: "Pending", count: orders.filter((o) => o.status === "pending").length },
            { id: "packing", label: "Packing", count: orders.filter((o) => o.status === "packing").length },
            { id: "ready", label: "Ready", count: orders.filter((o) => o.status === "ready").length },
            { id: "delivery", label: "Out for Delivery", count: orders.filter((o) => o.status === "delivery").length },
            { id: "delivered", label: "Delivered", count: orders.filter((o) => o.status === "delivered").length },
            { id: "cancelled", label: "Cancelled", count: orders.filter((o) => o.status === "cancelled").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as OrderFilter)}
              className={`flex-1 min-w-[120px] px-4 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.id
                  ? "text-[#16A34A] border-[#16A34A] bg-[#F0FDF4]"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-700">Order#</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-700">Customer</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-700">Items</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-700">Amount</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-700">Type</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-700">Time</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-700">Status</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-gray-500 text-sm">
                    No orders in this category
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700 max-w-[200px] truncate">
                      {formatItems(order.items)}
                    </td>
                    <td className="px-5 py-4 text-sm text-right font-medium text-gray-900">
                      ₹{order.total}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${order.type === "home" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                          }`}
                      >
                        {order.type === "home" ? "🏠 Delivery" : "🏪 Pickup"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-center text-gray-600">
                      {getTimeAgo(order.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {order.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(order.id, "packing")}
                              className="px-3 py-1 bg-[#16A34A] text-white rounded text-xs font-medium hover:bg-[#15803D]"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(order.id)}
                              className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {order.status === "packing" && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, "ready")}
                            className="px-3 py-1 bg-amber-500 text-white rounded text-xs font-medium hover:bg-amber-600"
                          >
                            Mark Ready
                          </button>
                        )}
                        {order.status === "ready" && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, "delivery")}
                            className="px-3 py-1 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700"
                          >
                            Dispatch
                          </button>
                        )}
                        {order.status === "delivery" && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, "delivered")}
                            className="px-3 py-1 bg-[#16A34A] text-white rounded text-xs font-medium hover:bg-[#15803D]"
                          >
                            Delivered
                          </button>
                        )}
                        {(order.status === "delivered" || order.status === "cancelled") && (
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50"
                          >
                            View
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Side Panel */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
          <div className="bg-white h-full w-full max-w-md overflow-y-auto shadow-2xl">
            {/* Panel Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedOrder.id}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {getTimeAgo(selectedOrder.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.toUpperCase()}
                </span>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">Customer</h3>
                <p className="font-semibold text-gray-900">{selectedOrder.customer}</p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {selectedOrder.phone}
                </p>
                {selectedOrder.address && (
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {selectedOrder.address}
                  </p>
                )}
                <span
                  className={`inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full ${selectedOrder.type === "home" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                    }`}
                >
                  {selectedOrder.type === "home" ? "🏠 Home Delivery" : "🏪 Store Pickup"}
                </span>
              </div>

              {/* Item Breakdown */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-600">Fruit</th>
                        <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-600">Qty</th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-600">Rate</th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-600">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2.5 font-medium text-gray-900">{item.fruit}</td>
                          <td className="px-4 py-2.5 text-center text-gray-700">{item.qty} {item.unit}</td>
                          <td className="px-4 py-2.5 text-right text-gray-700">₹{item.rate}</td>
                          <td className="px-4 py-2.5 text-right font-medium text-gray-900">₹{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{selectedOrder.subtotal}</span>
                  </div>
                  {selectedOrder.deliveryCharge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span className="text-gray-900">₹{selectedOrder.deliveryCharge}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-[#16A34A]">₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Payment & Notes */}
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment</span>
                  <span className="font-medium">{selectedOrder.paymentMethod}</span>
                </div>
                {selectedOrder.email && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium">{selectedOrder.email}</span>
                  </div>
                )}
              </div>

              {selectedOrder.notes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Notes</h3>
                  <p className="text-sm text-gray-700 bg-amber-50 border border-amber-200 p-3 rounded-lg">
                    {selectedOrder.notes}
                  </p>
                </div>
              )}

              {/* Status Update Buttons */}
              <div className="space-y-3 pt-2">
                {(() => {
                  const next = getNextAction(selectedOrder.status);
                  return next ? (
                    <button
                      onClick={() => handleStatusUpdate(selectedOrder.id, next.next as typeof selectedOrder.status)}
                      className="w-full py-3 bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#15803D] transition-colors flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      {next.label}
                    </button>
                  ) : null;
                })()}

                {selectedOrder.status === "pending" && (
                  <button
                    onClick={() => handleReject(selectedOrder.id)}
                    className="w-full py-3 border-2 border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                  >
                    Reject Order
                  </button>
                )}

                <button
                  onClick={() => downloadBill(selectedOrder)}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print Bill
                </button>

                <a
                  href={`tel:${selectedOrder.phone}`}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call {selectedOrder.customer}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}