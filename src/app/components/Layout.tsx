import { Outlet, NavLink, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
  FileText,
  Package,
  LayoutDashboard,
  BarChart3,
  AlertCircle,
  ShoppingBag,
  Users,
  Settings as SettingsIcon,
  Menu,
  X,
  Search,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Globe,
  User,
  Lock,
  Eye,
} from "lucide-react";
import { useOrders } from "../context/OrderContext";

export function Layout() {
  const navigate = useNavigate();
  const { orders, getPendingOrdersCount, getRecentOrders } = useOrders();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const pendingCount = getPendingOrdersCount();
  const recentOrders = getRecentOrders(3);

  const navItems = [
    { to: "/admin", label: "Billing", icon: FileText },
    { to: "/admin/stock-intake", label: "Stock Intake", icon: Package },
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/admin/alerts", label: "Alerts", icon: AlertCircle },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBag, badge: pendingCount > 0 ? pendingCount : undefined },
    { to: "/admin/customers", label: "Customers", icon: Users },
    { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
  ];

  // Generate notifications from recent orders
  const notifications = [
    ...recentOrders
      .filter((order) => order.status === "pending")
      .map((order) => ({
        message: `New order ${order.id} from ${order.customer}`,
        color: "green",
        time: getTimeAgo(order.createdAt),
      })),
    { message: "Mango batch expiring in 6 hours", color: "red", time: "2 hrs ago" },
    { message: "Grapes stock below reorder level", color: "amber", time: "3 hrs ago" },
    { message: "GST report ready for March", color: "blue", time: "5 hrs ago" },
  ];

  function getTimeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  }

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === "/") return "Billing";
    const item = navItems.find((item) => item.to === path);
    return item ? item.label : "Dashboard";
  };

  const currentTime = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 bg-[#111827] flex flex-col z-30 transform transition-all duration-300 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } ${sidebarOpen ? "w-56" : "lg:w-20 w-56"}`}
      >
        {/* Logo Section */}
        <div className="p-5 border-b border-[#1F2937]">
          <div className="flex items-center justify-between">
            <div className={`${!sidebarOpen && "lg:hidden"}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#16A34A] rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <h1 className="text-white font-semibold text-base">SFBSOS</h1>
                  <p className="text-gray-400 text-xs">Fruit Shop POS</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:block text-gray-400 hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex items-center justify-center w-full mt-3 text-gray-400 hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative group ${isActive
                      ? "bg-[#14532D] text-[#16A34A] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#16A34A] before:rounded-r"
                      : "text-gray-300 hover:bg-[#1F2937] hover:text-white"
                    }`
                  }
                  title={!sidebarOpen ? item.label : ""}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`text-sm ${!sidebarOpen && "lg:hidden"}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className={`absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full ${!sidebarOpen && "lg:hidden"
                        }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-[#1F2937]">
          <div className={`flex items-center gap-3 px-3 py-2 ${!sidebarOpen && "lg:justify-center"}`}>
            <div className="w-9 h-9 bg-[#16A34A] rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              RA
            </div>
            <div className={`flex-1 ${!sidebarOpen && "lg:hidden"}`}>
              <p className="text-white text-sm font-medium">Owner</p>
              <p className="text-gray-400 text-xs">Ram Agarwal</p>
            </div>
            <button
              className={`text-gray-400 hover:text-white ${!sidebarOpen && "lg:hidden"}`}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-10">
          {/* Left: Mobile menu + Breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-900">{getBreadcrumb()}</span>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bills, products, customers..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
              />
            </div>
          </div>

          {/* Right: Date/Time + Notifications */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <span>{currentDate}</span>
              <span className="text-gray-300">|</span>
              <span>{currentTime}</span>
            </div>
            <button
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <Bell className="w-5 h-5" />
              {notifications.filter(n => n.color === "green").length > 0 || pendingCount > 0 ? (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {pendingCount > 0 ? pendingCount : "!"}
                </span>
              ) : (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            <button
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {notificationOpen && (
          <div className="absolute right-6 top-16 bg-white border border-gray-200 shadow-xl rounded-xl w-80 z-20">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                  {pendingCount} new orders
                </span>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="p-3 flex items-start gap-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => { setNotificationOpen(false); if (notification.color === "green") navigate("/admin/orders"); }}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${notification.color === "red"
                        ? "bg-red-500"
                        : notification.color === "green"
                          ? "bg-green-500"
                          : notification.color === "amber"
                            ? "bg-amber-500"
                            : notification.color === "blue"
                              ? "bg-blue-500"
                              : "bg-gray-500"
                      }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-tight">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100 text-center">
              <button
                onClick={() => { setNotificationOpen(false); navigate("/admin/orders"); }}
                className="text-sm text-[#16A34A] font-medium hover:underline"
              >
                View all orders →
              </button>
            </div>
          </div>
        )}

        {/* Profile */}
        {profileOpen && (
          <div className="absolute right-6 top-16 bg-white border border-gray-200 shadow-xl rounded-xl w-64 z-20">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center text-white font-semibold">
                  RA
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Ram Agarwal</p>
                  <p className="text-xs text-gray-500">Owner · admin@sfbsos.com</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => { setProfileOpen(false); navigate("/"); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3"
              >
                <Eye className="w-4 h-4" />
                Switch to Customer View
              </button>
              <button
                onClick={() => { setProfileOpen(false); navigate("/admin/settings"); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3"
              >
                <Lock className="w-4 h-4" />
                Settings
              </button>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={() => { setProfileOpen(false); navigate("/admin/login"); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-3"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}