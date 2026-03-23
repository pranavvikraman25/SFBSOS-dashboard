import { useState } from "react";
import { Calendar, Save } from "lucide-react";

const fruits = [
  { name: "Apple", currentStock: "45 BOX", icon: "🍎" },
  { name: "Mango", currentStock: "12 KG", icon: "🥭" },
  { name: "Banana", currentStock: "28 BUNCH", icon: "🍌" },
  { name: "Orange", currentStock: "32 BOX", icon: "🍊" },
  { name: "Grapes", currentStock: "15 KG", icon: "🍇" },
  { name: "Watermelon", currentStock: "22 PC", icon: "🍉" },
  { name: "Pineapple", currentStock: "8 PC", icon: "🍍" },
  { name: "Pomegranate", currentStock: "18 KG", icon: "🍓" },
];

const currentStock = [
  { fruit: "Apple", stock: "45 BOX", unit: "BOX", batchDate: "18-Mar-26", daysOld: 2, status: "fresh" },
  { fruit: "Mango", stock: "12 KG", unit: "KG", batchDate: "17-Mar-26", daysOld: 3, status: "fresh" },
  { fruit: "Banana", stock: "28 BUNCH", unit: "BUNCH", batchDate: "16-Mar-26", daysOld: 4, status: "warning" },
  { fruit: "Orange", stock: "32 BOX", unit: "BOX", batchDate: "19-Mar-26", daysOld: 1, status: "fresh" },
  { fruit: "Grapes", stock: "15 KG", unit: "KG", batchDate: "14-Mar-26", daysOld: 6, status: "critical" },
  { fruit: "Watermelon", stock: "22 PC", unit: "PC", batchDate: "17-Mar-26", daysOld: 3, status: "fresh" },
  { fruit: "Pineapple", stock: "8 PC", unit: "PC", batchDate: "16-Mar-26", daysOld: 4, status: "warning" },
  { fruit: "Pomegranate", stock: "18 KG", unit: "KG", batchDate: "18-Mar-26", daysOld: 2, status: "fresh" },
];

const recentArrivals = [
  { date: "20-Mar-26", fruit: "Apple", qty: "12 BOX", cost: "₹5,760" },
  { date: "20-Mar-26", fruit: "Orange", qty: "8 BOX", cost: "₹5,760" },
  { date: "19-Mar-26", fruit: "Mango", qty: "25 KG", cost: "₹3,000" },
  { date: "19-Mar-26", fruit: "Grapes", qty: "18 KG", cost: "₹2,340" },
  { date: "18-Mar-26", fruit: "Watermelon", qty: "15 PC", cost: "₹2,250" },
];

export function StockIntake() {
  const [selectedFruit, setSelectedFruit] = useState("Apple");
  const [unitType, setUnitType] = useState<"KG" | "BOX" | "PIECE">("BOX");
  const [quantity, setQuantity] = useState("16");
  const [piecesPerBox, setPiecesPerBox] = useState("45");
  const [pricePerUnit, setPricePerUnit] = useState("480");
  const [supplierName, setSupplierName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const calculateTotalPieces = () => {
    const qty = parseFloat(quantity) || 0;
    const pieces = parseFloat(piecesPerBox) || 0;
    return qty * pieces;
  };

  const calculateTotalCost = () => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(pricePerUnit) || 0;
    return qty * price;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Stock saved successfully!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT - Record New Stock Arrival */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Record New Stock Arrival</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            {/* Fruit Selector */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Select Fruit</label>
              <select
                value={selectedFruit}
                onChange={(e) => setSelectedFruit(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
              >
                {fruits.map((fruit) => (
                  <option key={fruit.name} value={fruit.name}>
                    {fruit.icon} {fruit.name} — Current stock: {fruit.currentStock}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit Type Selector */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Unit Type</label>
              <div className="flex gap-3">
                {(["KG", "BOX", "PIECE"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setUnitType(type)}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all text-sm ${
                      unitType === type
                        ? "bg-[#16A34A] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Pieces per Box (if BOX selected) */}
            {unitType === "BOX" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Pieces per Box (editable)
                </label>
                <input
                  type="number"
                  value={piecesPerBox}
                  onChange={(e) => setPiecesPerBox(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                  placeholder="Enter pieces per box"
                />
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Quantity Entered</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                placeholder="Enter quantity"
              />
            </div>

            {/* Live Preview */}
            {unitType === "BOX" && (
              <div className="p-3 bg-[#F0FDF4] border border-[#16A34A]/20 rounded-lg">
                <p className="text-sm text-[#16A34A] italic">
                  <span className="font-semibold">{quantity || 0} boxes</span> × {piecesPerBox || 0} pieces ={" "}
                  <span className="font-bold">{calculateTotalPieces()} pieces total</span>
                </p>
              </div>
            )}

            {/* Purchase Price */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Purchase Price per Unit (₹)
              </label>
              <input
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                placeholder="Enter price per unit"
              />
            </div>

            {/* Supplier Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Supplier Name (Optional)
              </label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                placeholder="Enter supplier name"
                list="suppliers"
              />
              <datalist id="suppliers">
                <option value="Ram Traders" />
                <option value="Agarwal Brothers" />
                <option value="Fruit Mart Wholesale" />
              </datalist>
            </div>

            {/* Entry Date */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Entry Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Total Cost Preview */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Total Purchase Cost</span>
                <span className="text-xl font-bold text-gray-900">₹{calculateTotalCost().toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#15803D] transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Stock
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT - Two Cards Stacked */}
      <div className="lg:col-span-1 space-y-6">
        {/* Current Stock on Hand */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Current Stock on Hand</h3>
          </div>
          <div className="p-4 overflow-auto max-h-96">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-xs font-semibold text-gray-600">Fruit</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-600">Stock</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-600">Days Old</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentStock.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 text-xs font-medium text-gray-900">{item.fruit}</td>
                    <td className="py-2.5 text-xs text-gray-700">{item.stock}</td>
                    <td className="py-2.5">
                      <span
                        className={`text-xs font-medium ${
                          item.daysOld < 3
                            ? "text-green-600"
                            : item.daysOld <= 5
                            ? "text-amber-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.daysOld}d
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          item.status === "fresh"
                            ? "bg-green-100 text-green-700"
                            : item.status === "warning"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status === "fresh" ? "Fresh" : item.status === "warning" ? "Warn" : "Critical"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Arrivals */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Recent Arrivals (Last 7 Days)</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {recentArrivals.map((arrival, idx) => (
                <div key={idx} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{arrival.fruit}</p>
                    <p className="text-xs text-gray-500">{arrival.date} • {arrival.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{arrival.cost}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
