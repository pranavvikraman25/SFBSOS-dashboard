import { useState } from "react";
import { Search, Phone, CreditCard, Send, User } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  phone: string;
  gstin?: string;
  outstanding: number;
  creditLimit: number;
  lastPurchase: string;
}

const customers: Customer[] = [
  {
    id: 1,
    name: "Meena Stores",
    phone: "+91 98765 43210",
    gstin: "27AABCU9603R1ZX",
    outstanding: 12400,
    creditLimit: 50000,
    lastPurchase: "18-Mar-26",
  },
  {
    id: 2,
    name: "Raj Traders",
    phone: "+91 98123 45678",
    gstin: "27AABCU9603R1ZY",
    outstanding: 8950,
    creditLimit: 30000,
    lastPurchase: "19-Mar-26",
  },
  {
    id: 3,
    name: "Suresh Kumar",
    phone: "+91 97654 32109",
    outstanding: 0,
    creditLimit: 10000,
    lastPurchase: "20-Mar-26",
  },
  {
    id: 4,
    name: "Amit Patel",
    phone: "+91 96543 21098",
    outstanding: 3200,
    creditLimit: 15000,
    lastPurchase: "20-Mar-26",
  },
  {
    id: 5,
    name: "Priya Enterprises",
    phone: "+91 95432 10987",
    gstin: "27AABCU9603R1ZZ",
    outstanding: 0,
    creditLimit: 40000,
    lastPurchase: "17-Mar-26",
  },
];

const billHistory = [
  { billNo: "#B-2024-0185", date: "19-Mar-26", amount: 12400, gst: 620, status: "pending" },
  { billNo: "#B-2024-0178", date: "15-Mar-26", amount: 8950, gst: 447, status: "paid" },
  { billNo: "#B-2024-0165", date: "10-Mar-26", amount: 15200, gst: 760, status: "paid" },
  { billNo: "#B-2024-0152", date: "05-Mar-26", amount: 6800, gst: 340, status: "partial" },
  { billNo: "#B-2024-0143", date: "01-Mar-26", amount: 11500, gst: 575, status: "paid" },
];

export function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(customers[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT - Customer List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customers..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <button
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedCustomer?.id === customer.id ? "bg-[#F0FDF4]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {getInitials(customer.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.phone}</p>
                  </div>
                  <div className="text-right">
                    {customer.outstanding > 0 ? (
                      <p className="text-sm font-semibold text-red-600">
                        ₹{customer.outstanding.toLocaleString()}
                      </p>
                    ) : (
                      <p className="text-xs text-green-600 font-medium">Paid</p>
                    )}
                    <p className="text-xs text-gray-500">{customer.lastPurchase}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT - Customer Details */}
      <div className="lg:col-span-2">
        {selectedCustomer ? (
          <div className="space-y-6">
            {/* Customer Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#16A34A] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {getInitials(selectedCustomer.name)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{selectedCustomer.name}</h2>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedCustomer.phone}
                      </p>
                      {selectedCustomer.gstin && (
                        <p className="text-sm text-gray-600">GSTIN: {selectedCustomer.gstin}</p>
                      )}
                    </div>
                  </div>
                </div>

                {selectedCustomer.outstanding > 0 && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Outstanding Balance</p>
                    <p className="text-3xl font-bold text-red-600">
                      ₹{selectedCustomer.outstanding.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Credit Limit</p>
                  <p className="text-xl font-semibold text-gray-900">
                    ₹{selectedCustomer.creditLimit.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Last Purchase</p>
                  <p className="text-xl font-semibold text-gray-900">{selectedCustomer.lastPurchase}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#15803D] transition-colors flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Record Payment
                </button>
                <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Statement (WhatsApp)
                </button>
              </div>
            </div>

            {/* Bill History */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-5 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Bill History</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-700">Bill #</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-700">Date</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-gray-700">Amount</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-gray-700">GST</th>
                      <th className="text-center px-5 py-3 text-xs font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {billHistory.map((bill, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-5 py-4 text-sm font-medium text-gray-900">{bill.billNo}</td>
                        <td className="px-5 py-4 text-sm text-gray-700">{bill.date}</td>
                        <td className="px-5 py-4 text-sm text-right text-gray-900">
                          ₹{bill.amount.toLocaleString()}
                        </td>
                        <td className="px-5 py-4 text-sm text-right text-gray-700">
                          ₹{bill.gst.toLocaleString()}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                              bill.status === "paid"
                                ? "bg-green-100 text-green-700"
                                : bill.status === "partial"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {bill.status === "paid"
                              ? "Paid"
                              : bill.status === "partial"
                              ? "Partial"
                              : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Customer Selected</h3>
            <p className="text-gray-600">Select a customer from the list to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
