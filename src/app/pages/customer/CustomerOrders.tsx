import { useState } from "react";
import { Package, MapPin, Download, Star, X, Check, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useOrders } from "../../context/OrderContext";

type OrderStatus = "all" | "pending" | "ready" | "delivered" | "cancelled";

export function CustomerOrders() {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState<OrderStatus>("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const filteredOrders = orders.filter((order) =>
    activeTab === "all" ? true : order.status === activeTab
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "ready":
        return "bg-amber-100 text-amber-700";
      case "pending":
        return "bg-gray-100 text-gray-700";
      case "packing":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  function getTimeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Rajan Kumar</p>
        </div>
        <div className="px-4 py-2 bg-[#F0FDF4] border border-[#16A34A]/20 rounded-lg">
          <div className="text-sm text-gray-600">Total Spent</div>
          <div className="text-xl font-bold text-[#16A34A]">₹{totalSpent.toLocaleString()}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="flex overflow-x-auto">
          {[
            { id: "all", label: "All", count: orders.length },
            { id: "pending", label: "Pending", count: orders.filter((o) => o.status === "pending").length },
            { id: "ready", label: "Ready", count: orders.filter((o) => o.status === "ready").length },
            { id: "delivered", label: "Delivered", count: orders.filter((o) => o.status === "delivered").length },
            { id: "cancelled", label: "Cancelled", count: orders.filter((o) => o.status === "cancelled").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as OrderStatus)}
              className={`flex-1 min-w-[120px] px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
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

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">{order.id}</h3>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{order.date}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-lg font-semibold text-gray-900">₹{order.total}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{order.items}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.deliveryType === "home" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {order.deliveryType === "home" ? "Home Delivery" : "Store Pickup"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  View Details
                </button>
                <button className="px-4 py-2 bg-[#16A34A] text-white rounded-lg text-sm font-medium hover:bg-[#15803D] transition-colors">
                  Reorder
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">You don't have any {activeTab} orders</p>
          </div>
        )}
      </div>

      {/* Order Detail Panel */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
          <div className="bg-white h-full w-full max-w-md overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Timeline */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Order Timeline</h3>
                <div className="space-y-4">
                  {[
                    { step: "Placed", time: "21 Mar, 10:30 AM", completed: true },
                    { step: "Confirmed", time: "21 Mar, 10:35 AM", completed: true },
                    { step: "Packed", time: "21 Mar, 11:00 AM", completed: true },
                    { step: "Out for Delivery", time: "21 Mar, 2:45 PM", completed: true },
                    { step: "Delivered", time: "21 Mar, 5:20 PM", completed: selectedOrder.status === "delivered" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.completed ? "bg-[#16A34A]" : "bg-gray-200"
                        }`}
                      >
                        {item.completed && <Check className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${item.completed ? "text-gray-900" : "text-gray-400"}`}>
                          {item.step}
                        </p>
                        <p className="text-sm text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Bill Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹670</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Charge</span>
                    <span className="text-gray-900">₹50</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-[#16A34A]">₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              {selectedOrder.deliveryType === "home" && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Address
                  </h3>
                  <p className="text-sm text-gray-700">
                    42, Anna Nagar, Chennai – 600040
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Bill
                </button>
                {selectedOrder.status === "delivered" && (
                  <button className="w-full py-3 bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#15803D] transition-colors flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    Rate this Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}