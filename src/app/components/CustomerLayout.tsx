import { Outlet, useNavigate } from "react-router";
import { Search, ShoppingCart, User, Package } from "lucide-react";
import { useCart } from "../context/CartContext";

export function CustomerLayout() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <button onClick={() => navigate("/")} className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-[#16A34A] rounded-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-xl font-bold text-gray-900">SFBSOS Fruits</span>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for fruits..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/my-orders")}
                className="hidden md:flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#16A34A] text-sm font-medium border border-gray-200 rounded-lg hover:border-[#16A34A] transition-colors"
              >
                <Package className="w-4 h-4" />
                My Orders
              </button>
              <button
                onClick={() => navigate("/customer/auth")}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#16A34A] text-sm font-medium"
              >
                <User className="w-5 h-5" />
                Login
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="flex items-center gap-2 px-4 py-2 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">My Cart</span>
                {cartCount > 0 && (
                  <span className="bg-white text-[#16A34A] px-2 py-0.5 rounded-full text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#16A34A] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <span className="font-bold text-gray-900">SFBSOS</span>
              </div>
              <p className="text-sm text-gray-600">
                Fresh fruits delivered to your door. Quality guaranteed.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => navigate("/")} className="hover:text-[#16A34A]">Browse Fruits</button></li>
                <li><button onClick={() => navigate("/my-orders")} className="hover:text-[#16A34A]">Track Order</button></li>
                <li><button onClick={() => navigate("/my-orders")} className="hover:text-[#16A34A]">My Orders</button></li>
                <li><button onClick={() => navigate("/admin/login")} className="hover:text-[#16A34A] text-xs text-gray-400">Admin Portal →</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>+91 98421 00000</li>
                <li>support@sfbsos.com</li>
                <li>Chennai, Tamil Nadu</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Store Hours</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Mon - Sat: 8:00 AM - 9:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>© 2026 SFBSOS Fruit Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}