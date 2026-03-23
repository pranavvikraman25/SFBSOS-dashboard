import { useState } from "react";
import {
  Store,
  Apple,
  FileText,
  Receipt,
  Users,
  Bell,
  Database,
  Globe,
  Edit2,
  Trash2,
  Plus,
} from "lucide-react";

type SettingsCategory =
  | "shop"
  | "catalogue"
  | "gst"
  | "billformat"
  | "users"
  | "notifications"
  | "backup"
  | "language";

const fruitCatalogue = [
  {
    fruit: "Apple",
    baseUnit: "KG",
    convFactor: "45 pcs/box",
    shelfLife: 7,
    wasteCost: 5,
    gstRate: 5,
  },
  {
    fruit: "Mango",
    baseUnit: "KG",
    convFactor: "50 pcs/box",
    shelfLife: 5,
    wasteCost: 8,
    gstRate: 5,
  },
  {
    fruit: "Banana",
    baseUnit: "BUNCH",
    convFactor: "12 pcs/bunch",
    shelfLife: 4,
    wasteCost: 10,
    gstRate: 5,
  },
  {
    fruit: "Orange",
    baseUnit: "KG",
    convFactor: "60 pcs/box",
    shelfLife: 8,
    wasteCost: 5,
    gstRate: 5,
  },
  {
    fruit: "Grapes",
    baseUnit: "KG",
    convFactor: "N/A",
    shelfLife: 6,
    wasteCost: 12,
    gstRate: 5,
  },
];

export function Settings() {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>("catalogue");
  const [billFormat, setBillFormat] = useState<"58mm" | "80mm" | "a4">("80mm");
  const [showGSTOnRetail, setShowGSTOnRetail] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  const categories = [
    { id: "shop" as const, label: "Shop Profile", icon: Store },
    { id: "catalogue" as const, label: "Fruit Catalogue", icon: Apple },
    { id: "gst" as const, label: "GST Configuration", icon: FileText },
    { id: "billformat" as const, label: "Bill Format", icon: Receipt },
    { id: "users" as const, label: "User Accounts", icon: Users },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "backup" as const, label: "Backup & Export", icon: Database },
    { id: "language" as const, label: "Language", icon: Globe },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* LEFT - Category List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Settings</h3>
          </div>
          <nav className="p-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeCategory === category.id
                    ? "bg-[#F0FDF4] text-[#16A34A] font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="text-sm">{category.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* RIGHT - Content Area */}
      <div className="lg:col-span-3">
        {/* Fruit Catalogue */}
        {activeCategory === "catalogue" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Fruit Catalogue</h3>
              <button className="px-4 py-2 bg-[#16A34A] text-white rounded-lg text-sm font-medium hover:bg-[#15803D] transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Fruit
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-700">
                      Fruit Name
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-700">
                      Base Unit
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-700">
                      Conv Factor
                    </th>
                    <th className="text-center px-5 py-3 text-xs font-semibold text-gray-700">
                      Shelf Life (days)
                    </th>
                    <th className="text-center px-5 py-3 text-xs font-semibold text-gray-700">
                      Waste Cost %
                    </th>
                    <th className="text-center px-5 py-3 text-xs font-semibold text-gray-700">
                      GST Rate
                    </th>
                    <th className="text-center px-5 py-3 text-xs font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {fruitCatalogue.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">{item.fruit}</td>
                      <td className="px-5 py-4 text-sm text-gray-700">{item.baseUnit}</td>
                      <td className="px-5 py-4 text-sm text-gray-700">{item.convFactor}</td>
                      <td className="px-5 py-4 text-sm text-center text-gray-700">
                        {item.shelfLife}
                      </td>
                      <td className="px-5 py-4 text-sm text-center text-gray-700">
                        {item.wasteCost}%
                      </td>
                      <td className="px-5 py-4 text-sm text-center text-gray-700">
                        {item.gstRate}%
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 text-gray-600 hover:text-[#16A34A] hover:bg-[#F0FDF4] rounded">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bill Format */}
        {activeCategory === "billformat" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Bill Format Settings</h3>

              {/* Format Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Paper Size
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setBillFormat("58mm")}
                    className={`p-4 border-2 rounded-lg text-sm transition-all ${
                      billFormat === "58mm"
                        ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium mb-1">Thermal 58mm</div>
                    <div className="text-xs text-gray-500">Small receipt</div>
                  </button>
                  <button
                    onClick={() => setBillFormat("80mm")}
                    className={`p-4 border-2 rounded-lg text-sm transition-all ${
                      billFormat === "80mm"
                        ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium mb-1">Thermal 80mm</div>
                    <div className="text-xs text-gray-500">Standard receipt</div>
                  </button>
                  <button
                    onClick={() => setBillFormat("a4")}
                    className={`p-4 border-2 rounded-lg text-sm transition-all ${
                      billFormat === "a4"
                        ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium mb-1">A4 Full Page</div>
                    <div className="text-xs text-gray-500">Invoice format</div>
                  </button>
                </div>
              </div>

              {/* Preview Thumbnail */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Preview</label>
                <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 flex justify-center">
                  <div
                    className={`bg-white border-2 border-gray-300 shadow-lg ${
                      billFormat === "58mm"
                        ? "w-32 h-48"
                        : billFormat === "80mm"
                        ? "w-40 h-56"
                        : "w-48 h-64"
                    }`}
                  >
                    <div className="p-2 text-center">
                      <div className="text-xs font-semibold">SFBSOS</div>
                      <div className="text-[8px] text-gray-500 mt-1">Bill Preview</div>
                      <div className="border-t border-gray-300 mt-2 pt-2">
                        <div className="text-[8px] text-gray-600">Bill #{billFormat}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggle Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Show GST breakdown on retail bills
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Display CGST/SGST details even for retail customers
                    </p>
                  </div>
                  <button
                    onClick={() => setShowGSTOnRetail(!showGSTOnRetail)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      showGSTOnRetail ? "bg-[#16A34A]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        showGSTOnRetail ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Show shop logo on bill</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Include your shop logo at the top of the bill
                    </p>
                  </div>
                  <button
                    onClick={() => setShowLogo(!showLogo)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      showLogo ? "bg-[#16A34A]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        showLogo ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Categories Placeholder */}
        {activeCategory !== "catalogue" && activeCategory !== "billformat" && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              {categories.find((c) => c.id === activeCategory)?.icon &&
                (() => {
                  const Icon = categories.find((c) => c.id === activeCategory)!.icon;
                  return <Icon className="w-8 h-8 text-gray-400" />;
                })()}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {categories.find((c) => c.id === activeCategory)?.label}
            </h3>
            <p className="text-gray-600">
              Settings for {categories.find((c) => c.id === activeCategory)?.label.toLowerCase()}{" "}
              will be available here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
