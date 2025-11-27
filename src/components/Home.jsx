import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Cart from "./Cart";
import Products from "./Products";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import {
  ShoppingCart,
  LogOut,
  User,
} from "lucide-react";
import UserDetails from "./UserDetails";

function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout, loading } = useAuth();
  const { cart } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return isLogin ? (
      <Login onToggle={() => setIsLogin(false)} />
    ) : (
      <Register onToggle={() => setIsLogin(true)} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <ShoppingCart className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">ShopHub</h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition"
              >
                <ShoppingCart size={24} />
                {cart.totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.totalQuantity}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <User size={20} />
                <span className="hidden sm:inline font-medium">
                  {user.firstName}
                </span>
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Products />
      </main>

      {showCart && <Cart onClose={() => setShowCart(false)} />}
      {showProfile && <UserDetails onClose={() => setShowProfile(false)} />}
    </div>
  );
}

export default Home;
