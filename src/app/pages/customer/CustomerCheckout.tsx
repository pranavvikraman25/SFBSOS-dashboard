import { useState } from "react";
import { MapPin, Clock, CreditCard, Tag, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";

export function CustomerCheckout() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();

  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("pickup");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi" | "counter">("cod");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [timeSlot, setTimeSlot] = useState("morning");
  const [upiId, setUpiId] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [promoCode, setPromoCode] = useState("");

  // Customer details (in real app, this would come from auth context)
  const customerName = "Rajan Kumar";
  const customerPhone = "+91 98421 34567";
  const customerEmail = "rajan@example.com";

  const subtotal = getCartTotal();
  const deliveryCharge = deliveryType === "delivery" ? 50 : 0;
  const grandTotal = subtotal + deliveryCharge;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (deliveryType === "delivery" && (!address || !city || !pincode)) {
      alert("Please fill in all delivery details!");
      return;
    }

    // Create order
    addOrder({
      customer: customerName,
      phone: customerPhone,
      email: customerEmail,
      address: deliveryType === "delivery" ? `${address}, ${city} – ${pincode}` : undefined,
      items: cart.map((item) => ({
        fruit: item.name,
        qty: item.quantity,
        unit: item.unit,
        rate: item.price,
        total: item.price * item.quantity,
      })),
      subtotal,
      deliveryCharge,
      total: grandTotal,
      type: deliveryType === "delivery" ? "home" : "pickup",
      timeSlot: deliveryType === "delivery" ? timeSlot : undefined,
      paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "upi" ? `UPI: ${upiId}` : "Pay at Counter",
      notes: orderNotes,
    });

    // Clear cart
    clearCart();

    // Show success and navigate
    alert("Order placed successfully! 🎉");
    navigate("/my-orders");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some fruits to your cart to checkout</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#15803D] transition-colors"
          >
            Browse Fruits
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Shopping</span>
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT - Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cart Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} × {item.quantity} {item.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">₹{subtotal}</span>
              </div>
              {deliveryType === "delivery" && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="font-medium text-gray-900">₹{deliveryCharge}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-semibold text-gray-900">Grand Total</span>
                <span className="text-xl font-bold text-[#16A34A]">₹{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Delivery Type */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Type</h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setDeliveryType("pickup")}
                className={`p-4 border-2 rounded-lg transition-all ${
                  deliveryType === "pickup"
                    ? "border-[#16A34A] bg-[#F0FDF4]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-lg font-semibold text-gray-900 mb-1">Store Pickup</div>
                <div className="text-sm text-[#16A34A] font-medium">Free</div>
              </button>

              <button
                onClick={() => setDeliveryType("delivery")}
                className={`p-4 border-2 rounded-lg transition-all ${
                  deliveryType === "delivery"
                    ? "border-[#16A34A] bg-[#F0FDF4]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-lg font-semibold text-gray-900 mb-1">Home Delivery</div>
                <div className="text-sm text-gray-700">₹50</div>
              </button>
            </div>

            {/* Home Delivery Fields */}
            {deliveryType === "delivery" && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Full Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    placeholder="Enter your complete delivery address"
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="600001"
                      className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Delivery Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "morning", label: "Morning", time: "9-12" },
                      { id: "afternoon", label: "Afternoon", time: "12-5" },
                      { id: "evening", label: "Evening", time: "5-8" },
                    ].map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setTimeSlot(slot.id)}
                        className={`p-3 border-2 rounded-lg transition-all text-center ${
                          timeSlot === slot.id
                            ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]"
                            : "border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-sm font-medium">{slot.label}</div>
                        <div className="text-xs">{slot.time}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              <CreditCard className="w-5 h-5 inline mr-2" />
              Payment Method
            </h2>

            <div className="space-y-3">
              {[
                { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive" },
                { id: "upi", label: "UPI Payment", desc: "Google Pay, PhonePe, Paytm" },
                { id: "counter", label: "Pay at Counter", desc: "For store pickup only" },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  disabled={deliveryType === "delivery" && method.id === "counter"}
                  className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                    paymentMethod === method.id
                      ? "border-[#16A34A] bg-[#F0FDF4]"
                      : "border-gray-200 hover:border-gray-300"
                  } ${deliveryType === "delivery" && method.id === "counter" ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="font-medium text-gray-900">{method.label}</div>
                  <div className="text-sm text-gray-600">{method.desc}</div>
                </button>
              ))}
            </div>

            {paymentMethod === "upi" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 bg-[#16A34A] text-white rounded-lg text-lg font-semibold hover:bg-[#15803D] transition-colors"
          >
            Place Order
          </button>
        </div>

        {/* RIGHT - Your Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={customerName}
                  readOnly
                  className="w-full px-4 py-2.5 bg-gray-100 border border-[#D1D5DB] rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  value={customerPhone}
                  readOnly
                  className="w-full px-4 py-2.5 bg-gray-100 border border-[#D1D5DB] rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes</label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  rows={3}
                  placeholder="Special instructions..."
                  className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                  />
                  <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    Apply
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#F0FDF4] rounded-lg border border-[#16A34A]/20">
                <div className="text-sm font-medium text-gray-900 mb-1">Estimated Delivery</div>
                <div className="text-lg font-semibold text-[#16A34A]">Today by 6:00 PM</div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">📱 You will receive SMS updates on your order status</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
