import { useState } from "react";
import { ShoppingCart, Plus, Minus, Truck, Store, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";

interface FruitProduct {
  id: number;
  name: string;
  price: number;
  unit: string;
  emoji: string;
  stock: "in-stock" | "limited";
}

const fruits: FruitProduct[] = [
  { id: 1, name: "Apple", price: 80, unit: "kg", emoji: "🍎", stock: "in-stock" },
  { id: 2, name: "Mango", price: 120, unit: "kg", emoji: "🥭", stock: "in-stock" },
  { id: 3, name: "Banana", price: 60, unit: "dozen", emoji: "🍌", stock: "in-stock" },
  { id: 4, name: "Orange", price: 90, unit: "kg", emoji: "🍊", stock: "in-stock" },
  { id: 5, name: "Grapes", price: 150, unit: "kg", emoji: "🍇", stock: "limited" },
  { id: 6, name: "Watermelon", price: 40, unit: "kg", emoji: "🍉", stock: "in-stock" },
  { id: 7, name: "Pineapple", price: 80, unit: "piece", emoji: "🍍", stock: "in-stock" },
  { id: 8, name: "Pomegranate", price: 200, unit: "kg", emoji: "🍓", stock: "limited" },
];

export function CustomerShop() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>(
    fruits.reduce((acc, fruit) => ({ ...acc, [fruit.id]: 1 }), {})
  );

  const updateQuantity = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + delta),
    }));
  };

  const handleAddToCart = (fruit: FruitProduct) => {
    addToCart({
      id: fruit.id,
      name: fruit.name,
      price: fruit.price,
      unit: fruit.unit,
      emoji: fruit.emoji,
      quantity: quantities[fruit.id],
    });
    
    // Show success feedback
    const button = document.getElementById(`add-to-cart-${fruit.id}`);
    if (button) {
      button.textContent = "✓ Added!";
      setTimeout(() => {
        button.textContent = "Add to Cart";
      }, 1500);
    }
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fresh Fruits Delivered to Your Door
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Order online, pick up in store or get home delivery
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3 bg-white text-[#16A34A] rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center gap-2"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/my-orders")}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Track My Order
              </button>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Truck className="w-5 h-5" />
              <span className="text-sm">Home delivery available • Extra charges apply</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fruit Catalog */}
      <div id="catalog" className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Fresh Fruits</h2>
          <p className="text-gray-600">Hand-picked quality fruits delivered fresh every day</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fruits.map((fruit) => (
            <div
              key={fruit.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Fruit Emoji Circle */}
              <div className="w-24 h-24 mx-auto mb-4 bg-[#F0FDF4] rounded-full flex items-center justify-center text-5xl">
                {fruit.emoji}
              </div>

              {/* Fruit Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{fruit.name}</h3>

              {/* Price */}
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-[#16A34A]">₹{fruit.price}</span>
                <span className="text-gray-600 text-sm ml-1">/ {fruit.unit}</span>
              </div>

              {/* Availability Badge */}
              <div className="flex justify-center mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    fruit.stock === "in-stock"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {fruit.stock === "in-stock" ? "In Stock" : "Limited"}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <button
                  onClick={() => updateQuantity(fruit.id, -1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-700" />
                </button>
                <span className="w-16 text-center font-medium text-gray-900">
                  {quantities[fruit.id]} {fruit.unit}
                </span>
                <button
                  onClick={() => updateQuantity(fruit.id, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-700" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                id={`add-to-cart-${fruit.id}`}
                onClick={() => handleAddToCart(fruit)}
                className="w-full py-2.5 bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#15803D] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Info Banner */}
      <div className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Delivery Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4 p-6 bg-[#F0FDF4] rounded-xl">
              <div className="p-3 bg-[#16A34A] rounded-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Home Delivery</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• ₹50 within 5km</li>
                  <li>• ₹80 within 10km</li>
                  <li>
                    • <span className="font-semibold text-[#16A34A]">Free</span> above ₹500
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Pick-up from Store</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• No extra charge</li>
                  <li>• Ready in 30 minutes</li>
                  <li>
                    • <span className="font-semibold text-blue-600">Freshest</span> selection
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
