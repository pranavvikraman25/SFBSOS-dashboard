import { useState } from "react";
import { Printer, Check, X, Trash2, Scan } from "lucide-react";

interface CartItem {
  id: string;
  fruit: string;
  unit: "BOX" | "KG" | "BUNCH";
  qty: number;
  rate: number;
  amount: number;
}

const initialCart: CartItem[] = [
  { id: "1", fruit: "Apple", unit: "BOX", qty: 2, rate: 480, amount: 960 },
  { id: "2", fruit: "Mango", unit: "KG", qty: 5, rate: 120, amount: 600 },
  { id: "3", fruit: "Banana", unit: "BUNCH", qty: 3, rate: 60, amount: 180 },
  { id: "4", fruit: "Orange", unit: "BOX", qty: 1, rate: 720, amount: 720 },
];

const stockStatus = [
  { fruit: "Apple", stock: "45 BOX", unit: "BOX", status: "ok" },
  { fruit: "Mango", stock: "12 KG", unit: "KG", status: "critical" },
  { fruit: "Banana", stock: "28 BUNCH", unit: "BUNCH", status: "ok" },
  { fruit: "Orange", stock: "8 BOX", unit: "BOX", status: "ok" },
  { fruit: "Grapes", stock: "15 KG", unit: "KG", status: "low" },
  { fruit: "Watermelon", stock: "22 PC", unit: "PC", status: "ok" },
];

const recentBills = [
  { id: "#B-2024-0186", customer: "Suresh Kumar", amount: 1850, type: "RETAIL", time: "10:45 AM" },
  { id: "#B-2024-0185", customer: "Meena Stores", amount: 12400, type: "GST", time: "10:22 AM" },
  { id: "#B-2024-0184", customer: "Walk-in", amount: 680, type: "RETAIL", time: "09:58 AM" },
  { id: "#B-2024-0183", customer: "Raj Traders", amount: 8950, type: "GST", time: "09:35 AM" },
  { id: "#B-2024-0182", customer: "Amit Patel", amount: 2240, type: "RETAIL", time: "09:12 AM" },
];

export function Billing() {
  const [isWholesale, setIsWholesale] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [gstin, setGstin] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "upi" | "credit">("cash");

  const subtotal = cart.reduce((sum, item) => sum + item.amount, 0);
  const cgst = isWholesale ? subtotal * 0.025 : 0;
  const sgst = isWholesale ? subtotal * 0.025 : 0;
  const gstTotal = cgst + sgst;
  const grandTotal = subtotal + gstTotal - discount;

  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT PANEL - New Bill */}
      <div className="lg:col-span-7">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">New Bill</h2>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">#B-2024-0187</p>
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString("en-IN")} • {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-5">
            {/* Wholesale Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Bill Type</span>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${!isWholesale ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
                  Retail Bill
                </span>
                <button
                  onClick={() => setIsWholesale(!isWholesale)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    isWholesale ? "bg-[#16A34A]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      isWholesale ? "translate-x-7" : ""
                    }`}
                  />
                </button>
                <span className={`text-sm ${isWholesale ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
                  Wholesale / GST Bill
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Phone (Optional)</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                />
              </div>
            </div>

            {/* GSTIN Field (Wholesale Only) */}
            {isWholesale && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Customer GSTIN</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  placeholder="Enter GSTIN"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                />
              </div>
            )}

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Type fruit name or scan barcode..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent pr-12"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded">
                <Scan className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Cart Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700">Fruit</th>
                    <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-700">Unit</th>
                    <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-700">Qty</th>
                    <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-700">Rate</th>
                    <th className="text-right px-3 py-2.5 text-xs font-semibold text-gray-700">Amount</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2.5 text-sm text-gray-900">{item.fruit}</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                          {item.unit}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-sm text-center text-gray-900">{item.qty}</td>
                      <td className="px-3 py-2.5 text-sm text-right text-gray-900">₹{item.rate}</td>
                      <td className="px-3 py-2.5 text-sm text-right font-medium text-gray-900">₹{item.amount}</td>
                      <td className="px-3 py-2.5">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>

              {isWholesale && (
                <>
                  <div className="flex justify-between text-sm text-[#16A34A]">
                    <span>CGST 2.5%</span>
                    <span className="font-medium">₹{cgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#16A34A]">
                    <span>SGST 2.5%</span>
                    <span className="font-medium">₹{sgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-[#16A34A]">
                    <span>GST Total</span>
                    <span>₹{gstTotal.toFixed(2)}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Discount</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-24 px-2 py-1 text-right bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  placeholder="0"
                />
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-base font-semibold text-gray-900">GRAND TOTAL</span>
                <span className="text-2xl font-bold text-[#16A34A]">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Payment Method</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex-1 px-4 py-2.5 rounded-lg border-2 transition-all text-sm font-medium ${
                    paymentMethod === "cash"
                      ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  💵 Cash
                </button>
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex-1 px-4 py-2.5 rounded-lg border-2 transition-all text-sm font-medium ${
                    paymentMethod === "upi"
                      ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  📱 UPI
                </button>
                <button
                  onClick={() => setPaymentMethod("credit")}
                  className={`flex-1 px-4 py-2.5 rounded-lg border-2 transition-all text-sm font-medium ${
                    paymentMethod === "credit"
                      ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  📋 Credit
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Printer className="w-5 h-5" />
                Print Bill
              </button>
              <button className="flex-1 px-6 py-3 bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#15803D] transition-colors flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Save & New
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Today's Summary */}
      <div className="lg:col-span-5 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Bills Today</p>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Today's Revenue</p>
            <p className="text-2xl font-bold text-gray-900">₹18,420</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">GST Collected</p>
            <p className="text-2xl font-bold text-[#16A34A]">₹890</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Pending Credit</p>
            <p className="text-2xl font-bold text-red-600">₹3,200</p>
          </div>
        </div>

        {/* Quick Stock Check */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Quick Stock Check</h3>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {stockStatus.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.fruit}</p>
                    <p className="text-xs text-gray-500">{item.stock}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === "ok"
                        ? "bg-green-100 text-green-700"
                        : item.status === "low"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status === "ok" ? "OK" : item.status === "low" ? "Low" : "Critical"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bills */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Recent Bills</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {recentBills.map((bill, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{bill.id}</p>
                    <p className="text-xs text-gray-500">{bill.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">₹{bill.amount.toLocaleString()}</p>
                    <div className="flex items-center gap-2 justify-end">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${
                          bill.type === "RETAIL"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {bill.type}
                      </span>
                      <span className="text-xs text-gray-500">{bill.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full text-sm text-[#16A34A] font-medium hover:underline">
              View All Bills →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
