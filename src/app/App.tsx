import { RouterProvider } from "react-router";
import { router } from "./routes";
import { OrderProvider } from "./context/OrderContext";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </OrderProvider>
  );
}