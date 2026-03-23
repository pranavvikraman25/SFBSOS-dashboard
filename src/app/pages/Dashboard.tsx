import { TrendingUp, DollarSign, FileText, Package, AlertCircle } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { week: "W1", revenue: 45000, cost: 32000, profit: 13000 },
  { week: "W2", revenue: 52000, cost: 35000, profit: 17000 },
  { week: "W3", revenue: 48000, cost: 33000, profit: 15000 },
  { week: "W4", revenue: 61000, cost: 40000, profit: 21000 },
  { week: "W5", revenue: 55000, cost: 38000, profit: 17000 },
  { week: "W6", revenue: 67000, cost: 42000, profit: 25000 },
  { week: "W7", revenue: 59000, cost: 39000, profit: 20000 },
  { week: "W8", revenue: 72000, cost: 45000, profit: 27000 },
];

const topFruits = [
  { name: "Mango", revenue: 48600 },
  { name: "Apple", revenue: 42300 },
  { name: "Banana", revenue: 36800 },
  { name: "Orange", revenue: 31200 },
  { name: "Grapes", revenue: 28400 },
];

const paymentModes = [
  { name: "Cash", value: 62, color: "#16A34A" },
  { name: "UPI", value: 28, color: "#1976D2" },
  { name: "Credit", value: 10, color: "#F57C00" },
];

const stockHealth = [
  { fruit: "Apple", shelfLife: 45 },
  { fruit: "Mango", shelfLife: 88 },
  { fruit: "Banana", shelfLife: 72 },
  { fruit: "Orange", shelfLife: 35 },
  { fruit: "Grapes", shelfLife: 91 },
  { fruit: "Watermelon", shelfLife: 58 },
  { fruit: "Pineapple", shelfLife: 68 },
  { fruit: "Pomegranate", shelfLife: 42 },
];

const forecast = [
  { fruit: "Mango", lastWeek: 120, forecast: 135, recommended: 140, unit: "KG" },
  { fruit: "Apple", lastWeek: 85, forecast: 92, recommended: 95, unit: "BOX" },
  { fruit: "Banana", lastWeek: 95, forecast: 98, recommended: 100, unit: "BUNCH" },
  { fruit: "Orange", lastWeek: 72, forecast: 78, recommended: 80, unit: "BOX" },
  { fruit: "Grapes", lastWeek: 64, forecast: 68, recommended: 70, unit: "KG" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Row 1 - 5 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-[#F0FDF4] rounded-lg">
              <DollarSign className="w-5 h-5 text-[#16A34A]" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-1">Today's Revenue</p>
          <p className="text-2xl font-bold text-gray-900">₹18,420</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="p-2.5 bg-blue-50 rounded-lg mb-3 w-fit">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mb-1">Bills Today</p>
          <p className="text-2xl font-bold text-gray-900">24</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="p-2.5 bg-[#F0FDF4] rounded-lg mb-3 w-fit">
            <TrendingUp className="w-5 h-5 text-[#16A34A]" />
          </div>
          <p className="text-xs text-gray-500 mb-1">Net Profit Today</p>
          <p className="text-2xl font-bold text-gray-900">₹4,820</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="p-2.5 bg-purple-50 rounded-lg mb-3 w-fit">
            <Package className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-xs text-gray-500 mb-1">Stock Value on Hand</p>
          <p className="text-2xl font-bold text-gray-900">₹42,300</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">3</span>
          </div>
          <p className="text-xs text-gray-500 mb-1">Active Alerts</p>
          <p className="text-2xl font-bold text-gray-900">Expiring Soon</p>
        </div>
      </div>

      {/* Row 2 - Two Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue vs Cost vs Profit — Last 8 Weeks</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" stroke="#6B7280" style={{ fontSize: "12px" }} />
              <YAxis stroke="#6B7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => `₹${value.toLocaleString()}`}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="revenue" stroke="#1976D2" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={2} name="Cost" />
              <Line type="monotone" dataKey="profit" stroke="#16A34A" strokeWidth={2} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Top 5 Fruits by Revenue This Week</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topFruits} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#6B7280" style={{ fontSize: "12px" }} />
              <YAxis type="category" dataKey="name" stroke="#6B7280" width={80} style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => `₹${value.toLocaleString()}`}
              />
              <Bar dataKey="revenue" fill="#16A34A" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3 - Three Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Mode Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Mode Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={paymentModes}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {paymentModes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {paymentModes.map((mode, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mode.color }} />
                  <span className="text-gray-700">{mode.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{mode.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Health Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Stock Health Overview</h3>
          <div className="space-y-3">
            {stockHealth.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{item.fruit}</span>
                  <span
                    className={`font-semibold ${
                      item.shelfLife < 60
                        ? "text-green-600"
                        : item.shelfLife <= 85
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.shelfLife}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.shelfLife < 60
                        ? "bg-green-500"
                        : item.shelfLife <= 85
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${item.shelfLife}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demand Forecast */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Demand Forecast — Next Week</h3>
          <div className="overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-semibold text-gray-600">Fruit</th>
                  <th className="text-right py-2 font-semibold text-gray-600">Last</th>
                  <th className="text-right py-2 font-semibold text-gray-600">Forecast</th>
                  <th className="text-right py-2 font-semibold text-gray-600">Buy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {forecast.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2 text-gray-900 font-medium">{item.fruit}</td>
                    <td className="py-2 text-right text-gray-700">{item.lastWeek}</td>
                    <td className="py-2 text-right text-gray-700">{item.forecast}</td>
                    <td className="py-2 text-right">
                      <span className="font-semibold text-[#16A34A]">
                        {item.recommended} {item.unit}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
