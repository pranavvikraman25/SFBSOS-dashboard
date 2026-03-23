import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { CustomerLayout } from "./components/CustomerLayout";

// Authentication Pages
import { AdminLogin } from "./pages/auth/AdminLogin";
import { CustomerAuth } from "./pages/auth/CustomerAuth";

// Admin Pages
import { Billing } from "./pages/admin/Billing";
import { StockIntake } from "./pages/admin/StockIntake";
import { Dashboard } from "./pages/admin/Dashboard";
import { Analytics } from "./pages/admin/Analytics";
import { AlertCentre } from "./pages/admin/AlertCentre";
import { Orders } from "./pages/admin/Orders";
import { Customers } from "./pages/admin/Customers";
import { Settings } from "./pages/admin/Settings";

// Customer Pages
import { CustomerShop } from "./pages/customer/CustomerShop";
import { CustomerCheckout } from "./pages/customer/CustomerCheckout";
import { CustomerOrders } from "./pages/customer/CustomerOrders";

export const router = createBrowserRouter([
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/customer/auth",
    Component: CustomerAuth,
  },
  {
    path: "/admin",
    Component: Layout,
    children: [
      { index: true, Component: Billing },
      { path: "stock-intake", Component: StockIntake },
      { path: "dashboard", Component: Dashboard },
      { path: "analytics", Component: Analytics },
      { path: "alerts", Component: AlertCentre },
      { path: "orders", Component: Orders },
      { path: "customers", Component: Customers },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/",
    Component: CustomerLayout,
    children: [
      { index: true, Component: CustomerShop },
      { path: "checkout", Component: CustomerCheckout },
      { path: "my-orders", Component: CustomerOrders },
    ],
  },
]);
