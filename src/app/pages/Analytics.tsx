import { useState } from "react";
import { Download, FileSpreadsheet, ChevronUp, ChevronDown, Info } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { period: "W1", revenue: 45000, cost: 32000, profit: 13000 },
  { period: "W2", revenue: 52000, cost: 35000, profit: 17000 },
  { period: "W3", revenue: 48000, cost: 33000, profit: 15000 },
  { period: "W4", revenue: 61000, cost: 40000, profit: 21000 },
  { period: "W5", revenue: 55000, cost: 38000, profit: 17000 },
  { period: "W6", revenue: 67000, cost: 42000, profit: 25000 },
  { period: "W7", revenue: 59000, cost: 39000, profit: 20000 },
  { period: "W8", revenue: 72000, cost: 45000, profit: 27000 },
];

const monthlyData = [
  { period: "Jan", revenue: 185000, cost: 125000, profit: 60000 },
  { period: "Feb", revenue: 210000, cost: 140000, profit: 70000 },
  { period: "Mar", revenue: 195000, cost: 135000, profit: 60000 },
];

const yearlyData = [
  { period: "2024", revenue: 2100000, cost: 1450000, profit: 650000 },
  { period: "2025", revenue: 2450000, cost: 1680000, profit: 770000 },
  { period: "2026", revenue: 605000, cost: 400000, profit: 205000 },
];

const fruitPerformance = [
  { fruit: "Mango", unitsSold: 850, revenue: 48600, cost: 34000, profit: 14600, margin: 30.0, waste: 1200 },
  { fruit: "Apple", unitsSold: 720, revenue: 42300, cost: 29600, profit: 12700, margin: 30.0, waste: 980 },
  { fruit: "Banana", unitsSold: 1250, revenue: 36800, cost: 25800, profit: 11000, margin: 29.9, waste: 1450 },
  { fruit: "Orange", unitsSold: 640, revenue: 31200, cost: 21800, profit: 9400, margin: 30.1, waste: 850 },
  { fruit: "Grapes", unitsSold: 480, revenue: 28400, cost: 19900, profit: 8500, margin: 29.9, waste: 750 },
  { fruit: "Watermelon", unitsSold: 320, revenue: 22400, cost: 15700, profit: 6700, margin: 29.9, waste: 420 },
];

const wastageAnalysis = [
  { fruit: "Mango", purchased: 950, wasted: 100 },
  { fruit: "Apple", purchased: 780, wasted: 60 },
  { fruit: "Banana", purchased: 1400, wasted: 150 },
  { fruit: "Orange", purchased: 720, wasted: 80 },
  { fruit: "Grapes", purchased: 540, wasted: 60 },
];

export function Analytics() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("weekly");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const getChartData = () => {
    if (period === "weekly") return weeklyData;
    if (period === "monthly") return monthlyData;
    if (period === "yearly") return yearlyData;
    return weeklyData; // daily would be here
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const totalRevenue = fruitPerformance.reduce((sum, item) => sum + item.revenue, 0);
  const totalCost = fruitPerformance.reduce((sum, item) => sum + item.cost, 0);
  const totalProfit = fruitPerformance.reduce((sum, item) => sum + item.profit, 0);
  const totalWaste = fruitPerformance.reduce((sum, item) => sum + item.waste, 0);
  const totalUnits = fruitPerformance.reduce((sum, item) => sum + item.unitsSold, 0);
  const avgMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Bar with Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPeriod("daily")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              period === "daily"
                ? "bg-[#16A34A] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setPeriod("weekly")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              period === "weekly"
                ? "bg-[#16A34A] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              period === "monthly"
                ? "bg-[#16A34A] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod("yearly")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              period === "yearly"
                ? "bg-[#16A34A] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Yearly
          </button>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          />
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Section 1: Large Area Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Revenue / Cost / Profit Trend</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={getChartData()}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1976D2" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1976D2" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="period" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
              formatter={(value: number) => `₹${value.toLocaleString()}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1976D2"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="#EF4444"
              strokeWidth={2}
              fill="url(#colorCost)"
              name="Cost"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#16A34A"
              strokeWidth={2}
              fill="url(#colorProfit)"
              name="Profit"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Section 2: Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Per Fruit Performance Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Per Fruit Performance Table</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="text-left px-4 py-3 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("fruit")}
                  >
                    <div className="flex items-center gap-1">
                      Fruit
                      {sortField === "fruit" && (
                        sortDirection === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-700">Units Sold</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-700">Revenue</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-700">Cost</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-700">Profit</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-700">Margin %</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-700">Waste Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fruitPerformance.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{row.fruit}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{row.unitsSold}</td>
                    <td className="px-4 py-3 text-right text-gray-700">₹{row.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-700">₹{row.cost.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-[#16A34A] font-medium">
                      ₹{row.profit.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">{row.margin.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right text-red-600">₹{row.waste.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold border-t-2 border-gray-300">
                  <td className="px-4 py-3 text-gray-900">Total</td>
                  <td className="px-4 py-3 text-right text-gray-900">{totalUnits}</td>
                  <td className="px-4 py-3 text-right text-gray-900">₹{totalRevenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-900">₹{totalCost.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-[#16A34A]">₹{totalProfit.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-900">{avgMargin}%</td>
                  <td className="px-4 py-3 text-right text-red-600">₹{totalWaste.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* GST Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">GST Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">CGST Collected</span>
                <span className="font-semibold text-gray-900">₹3,420</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">SGST Collected</span>
                <span className="font-semibold text-gray-900">₹3,420</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">IGST Collected</span>
                <span className="font-semibold text-gray-900">₹0</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="text-sm font-semibold text-gray-900">Total GST</span>
                <span className="text-lg font-bold text-[#16A34A]">₹6,840</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                This data is ready for GSTR-1 filing
              </p>
            </div>

            <button className="w-full mt-4 px-4 py-2.5 bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#15803D] transition-colors text-sm">
              Download GST Report
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Purchase vs Wastage Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Purchase vs Wastage Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={wastageAnalysis}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="fruit" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="purchased" fill="#16A34A" name="Purchased Qty" radius={[8, 8, 0, 0]} />
            <Bar dataKey="wasted" fill="#EF4444" name="Wasted Qty" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
