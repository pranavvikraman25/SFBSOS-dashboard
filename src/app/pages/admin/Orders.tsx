import { useState } from "react";
import { Phone, X, Printer, Check } from "lucide-react";
import { useOrders } from "../../context/OrderContext";

type OrderFilter = "all" | "pending" | "packing" | "ready" | "delivery" | "delivered";

export function Orders() {
  const { orders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState<OrderFilter>("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "delivery") return order.status === "delivery";
    return order.status === activeTab;
  });

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-red-100 text-red-700";
      case "packing":
        return "bg-blue-100 text-blue-700";
      case "ready":
        return "bg-amber-100 text-amber-700";
      case "delivery":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleAction = (orderId: string, action: string) => {
    alert(`${action} for order ${orderId}`);
  };

  const downloadBill = (order: typeof orders[0]) => {
    const billContent = `
================================================
         SFBSOS FRUIT SHOP
         42, Main Street, Kavaraipettai
         Phone: +91 98421 00000
         GSTIN: 33AABCS1234A1Z5
================================================
INVOICE #SFBSOS-${order.id}
Date: ${new Date().toLocaleDateString()}
------------------------------------------------
Bill To:
  ${order.customer}
  ${order.phone}
  ${order.address || 'Store Pickup'}
------------------------------------------------
ITEMS
${order.items}
------------------------------------------------
Total Amount:            Rs.${order.amount}
Payment Mode: COD
------------------------------------------------
Thank you for your business!
Visit us again at SFBSOS Fruit Shop
================================================
    `.trim();

    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bill-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incoming Orders</h1>
        </div>
        <div className="px-4 py-2 bg-red-100 border border-red-200 rounded-lg">
          <span className="text-sm font-semibold text-red-700">{pendingCount} pending</span>
        </div>
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
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as OrderFilter)}
              className={`flex-1 min-w-[140px] px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
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
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-5 py-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="px-5 py-4 text-sm text-gray-700">{order.items}</td>
                  <td className="px-5 py-4 text-sm text-right font-medium text-gray-900">
                    ₹{order.amount}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        order.type === "home" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {order.type === "home" ? "Home Delivery" : "Store Pickup"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-center text-gray-600">{order.time}</td>
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
                            onClick={() => handleAction(order.id, "Accept")}
                            className="px-3 py-1 bg-[#16A34A] text-white rounded text-xs font-medium hover:bg-[#15803D]"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleAction(order.id, "Reject")}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {order.status === "packing" && (
                        <button
                          onClick={() => handleAction(order.id, "Mark Ready")}
                          className="px-3 py-1 bg-[#16A34A] text-white rounded text-xs font-medium hover:bg-[#15803D]"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === "ready" && (
                        <button
                          onClick={() => handleAction(order.id, "Dispatch")}
                          className="px-3 py-1 bg-[#16A34A] text-white rounded text-xs font-medium hover:bg-[#15803D]"
                        >
                          Dispatch
                        </button>
                      )}
                      {order.status === "delivered" && (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Side Panel */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
          <div className="bg-white h-full w-full max-w-md overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-900 font-medium">{selectedOrder.customer}</p>
                  <p className="text-gray-700">{selectedOrder.phone}</p>
                  {selectedOrder.address && <p className="text-gray-700">{selectedOrder.address}</p>}
                  <p>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        selectedOrder.type === "home" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {selectedOrder.type === "home" ? "Home Delivery" : "Store Pickup"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Item Breakdown */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
                <p className="text-sm text-gray-700">{selectedOrder.items}</p>
                {selectedOrder.type === "home" && (
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span className="text-gray-900">₹50</span>
                    </div>
                  </div>
                )}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="text-lg font-bold text-[#16A34A]">₹{selectedOrder.amount}</span>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              {selectedOrder.notes && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Notes</h3>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Status Update Buttons */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                {selectedOrder.status === "pending" && (
                  <button
                    onClick={() => handleAction(selectedOrder.id, "Confirm Packing")}
                    className="w-full py-3 bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#15803D] transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Confirm & Start Packing
                  </button>
                )}
                {selectedOrder.status === "packing" && (
                  <button
                    onClick={() => handleAction(selectedOrder.id, "Mark Ready")}
                    className="w-full py-3 bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#15803D] transition-colors"
                  >
                    Mark as Ready
                  </button>
                )}
                {selectedOrder.status === "ready" && (
                  <button
                    onClick={() => handleAction(selectedOrder.id, "Dispatch")}
                    className="w-full py-3 bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#15803D] transition-colors"
                  >
                    Dispatch for Delivery
                  </button>
                )}

                <button
                  onClick={() => downloadBill(selectedOrder)}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print Bill
                </button>

                <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}