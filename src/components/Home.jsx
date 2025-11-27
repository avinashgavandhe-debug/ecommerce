import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Cart from "./Cart";
import Products from "./Products";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { ShoppingCart, LogOut, User } from "lucide-react";
import UserDetails from "./UserDetails";
import Navbar from "./common/Navbar";

function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout, loading } = useAuth();
  const { cart } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
      {/* NAVBAR */}
      <Navbar setShowProfile={setShowProfile} setShowCart={setShowCart}/>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Products />
      </main>

      {/* MODALS */}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
      {showProfile && <UserDetails onClose={() => setShowProfile(false)} />}
    </div>
  );
}

export default Home;
