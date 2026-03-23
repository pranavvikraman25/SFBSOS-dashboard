import { useState } from "react";
import { AlertTriangle, Clock, Package, DollarSign, Check, BellOff, ShoppingBag } from "lucide-react";

type AlertType = "all" | "expiry" | "lowstock" | "payment";

interface Alert {
  id: number;
  type: "expiry" | "lowstock" | "payment";
  severity: "critical" | "warning" | "info";
  title: string;
  subtitle: string;
  timestamp: string;
  fruit?: string;
  batch?: string;
}

const alerts: Alert[] = [
  {
    id: 1,
    type: "expiry",
    severity: "critical",
    title: "Mango — Batch #12 expiring in 6 hours",
    subtitle: "42 kg remaining — consider price reduction to clear stock",
    timestamp: "2 hours ago",
    fruit: "Mango",
    batch: "#12",
  },
  {
    id: 2,
    type: "expiry",
    severity: "warning",
    title: "Grapes — Batch #34 expiring in 18 hours",
    subtitle: "28 kg remaining — mark down recommended",
    timestamp: "4 hours ago",
    fruit: "Grapes",
    batch: "#34",
  },
  {
    id: 3,
    type: "lowstock",
    severity: "info",
    title: "Banana stock running low",
    subtitle: "Only 8 bunches left — reorder recommended",
    timestamp: "5 hours ago",
    fruit: "Banana",
  },
  {
    id: 4,
    type: "payment",
    severity: "info",
    title: "Meena Stores payment overdue",
    subtitle: "₹12,400 pending for 15 days",
    timestamp: "1 day ago",
  },
  {
    id: 5,
    type: "expiry",
    severity: "warning",
    title: "Watermelon — Batch #89 expiring in 22 hours",
    subtitle: "15 pieces remaining",
    timestamp: "6 hours ago",
    fruit: "Watermelon",
    batch: "#89",
  },
  {
    id: 6,
    type: "lowstock",
    severity: "info",
    title: "Orange stock below minimum",
    subtitle: "5 boxes remaining — restock soon",
    timestamp: "8 hours ago",
    fruit: "Orange",
  },
  {
    id: 7,
    type: "payment",
    severity: "info",
    title: "Raj Traders payment pending",
    subtitle: "₹8,950 due — follow up needed",
    timestamp: "2 days ago",
  },
];

export function AlertCentre() {
  const [activeTab, setActiveTab] = useState<AlertType>("all");

  const filteredAlerts = alerts.filter((alert) =>
    activeTab === "all" ? true : alert.type === activeTab
  );

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "expiry":
        return Clock;
      case "lowstock":
        return Package;
      case "payment":
        return DollarSign;
      default:
        return AlertTriangle;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          border: "border-l-red-500",
          bg: "bg-red-50",
          icon: "text-red-600",
          badge: "bg-red-100 text-red-700",
        };
      case "warning":
        return {
          border: "border-l-amber-500",
          bg: "bg-amber-50",
          icon: "text-amber-600",
          badge: "bg-amber-100 text-amber-700",
        };
      case "info":
        return {
          border: "border-l-blue-500",
          bg: "bg-blue-50",
          icon: "text-blue-600",
          badge: "bg-blue-100 text-blue-700",
        };
      default:
        return {
          border: "border-l-gray-500",
          bg: "bg-gray-50",
          icon: "text-gray-600",
          badge: "bg-gray-100 text-gray-700",
        };
    }
  };

  const handleAcknowledge = (id: number) => {
    alert(`Alert ${id} acknowledged`);
  };

  const handleSnooze = (id: number) => {
    alert(`Alert ${id} snoozed for 2 hours`);
  };

  const handleOrder = (fruit: string) => {
    alert(`Redirecting to order ${fruit}...`);
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "text-[#16A34A] border-b-2 border-[#16A34A] bg-[#F0FDF4]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            All ({alerts.length})
          </button>
          <button
            onClick={() => setActiveTab("expiry")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "expiry"
                ? "text-[#16A34A] border-b-2 border-[#16A34A] bg-[#F0FDF4]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Expiry ({alerts.filter((a) => a.type === "expiry").length})
          </button>
          <button
            onClick={() => setActiveTab("lowstock")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "lowstock"
                ? "text-[#16A34A] border-b-2 border-[#16A34A] bg-[#F0FDF4]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Low Stock ({alerts.filter((a) => a.type === "lowstock").length})
          </button>
          <button
            onClick={() => setActiveTab("payment")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "payment"
                ? "text-[#16A34A] border-b-2 border-[#16A34A] bg-[#F0FDF4]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Payment Overdue ({alerts.filter((a) => a.type === "payment").length})
          </button>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          const colors = getAlertColor(alert.severity);

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-xl border border-gray-200 shadow-sm border-l-4 ${colors.border} hover:shadow-md transition-shadow`}
            >
              <div className="p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Alert Icon */}
                <div className={`p-3 ${colors.bg} rounded-lg flex-shrink-0`}>
                  <Icon className={`w-7 h-7 ${colors.icon}`} />
                </div>

                {/* Alert Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1">{alert.title}</h4>
                  <p className="text-sm text-gray-600">{alert.subtitle}</p>
                </div>

                {/* Timestamp and Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                  <span className="text-xs text-gray-500 whitespace-nowrap">{alert.timestamp}</span>

                  <div className="flex gap-2">
                    {alert.type === "lowstock" ? (
                      <button
                        onClick={() => handleOrder(alert.fruit || "")}
                        className="px-4 py-2 bg-[#16A34A] text-white rounded-lg text-sm font-medium hover:bg-[#15803D] transition-colors flex items-center gap-2 whitespace-nowrap"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Order Now
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAcknowledge(alert.id)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                          <Check className="w-4 h-4" />
                          Acknowledge
                        </button>
                        <button
                          onClick={() => handleSnooze(alert.id)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                          <BellOff className="w-4 h-4" />
                          Snooze 2h
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAlerts.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts in this category</h3>
          <p className="text-gray-600">All clear! You have no {activeTab} alerts at the moment.</p>
        </div>
      )}
    </div>
  );
}
