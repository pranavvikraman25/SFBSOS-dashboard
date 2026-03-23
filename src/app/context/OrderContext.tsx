import { createContext, useContext, useState, ReactNode } from "react";

export interface OrderItem {
  fruit: string;
  qty: number;
  unit: string;
  rate: number;
  total: number;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  email?: string;
  address?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  type: "home" | "pickup";
  timeSlot?: string;
  paymentMethod: string;
  notes?: string;
  status: "pending" | "packing" | "ready" | "delivery" | "delivered" | "cancelled";
  createdAt: Date;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "status" | "createdAt">) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  getPendingOrdersCount: () => number;
  getRecentOrders: (limit: number) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([
    // Pre-loaded sample orders
    {
      id: "ORD-0087",
      customer: "Karthik M",
      phone: "+91 87654 32109",
      address: "8, Koyambedu Market, Chennai – 600092",
      items: [
        { fruit: "Grapes", qty: 2, unit: "kg", rate: 150, total: 300 },
        { fruit: "Orange", qty: 3, unit: "kg", rate: 90, total: 270 },
      ],
      subtotal: 570,
      deliveryCharge: 50,
      total: 620,
      type: "home",
      timeSlot: "afternoon",
      paymentMethod: "cod",
      status: "ready",
      createdAt: new Date(Date.now() - 45 * 60000),
    },
    {
      id: "ORD-0086",
      customer: "Divya R",
      phone: "+91 88123 45678",
      items: [{ fruit: "Watermelon", qty: 5, unit: "kg", rate: 40, total: 200 }],
      subtotal: 200,
      deliveryCharge: 0,
      total: 200,
      type: "pickup",
      paymentMethod: "counter",
      status: "delivered",
      createdAt: new Date(Date.now() - 60 * 60000),
    },
  ]);

  const addOrder = (orderData: Omit<Order, "id" | "status" | "createdAt">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${String(Date.now()).slice(-4)}`,
      status: "pending",
      createdAt: new Date(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getPendingOrdersCount = () => {
    return orders.filter((order) => order.status === "pending").length;
  };

  const getRecentOrders = (limit: number) => {
    return orders.slice(0, limit);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getPendingOrdersCount,
        getRecentOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within OrderProvider");
  }
  return context;
}
