import { LogOut, ShoppingCart, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
const Navbar = ({ setShowCart }) => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  return (
    <>
      <nav className="backdrop-blur-md bg-white/70 shadow-sm sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center gap-3"
              onClick={() => navigate("/")}
            >
              <div className="p-2 bg-blue-100 rounded-xl">
                <ShoppingCart className="text-blue-600" size={28} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopHub
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 rounded-xl hover:bg-gray-100 transition-all group"
              >
                <ShoppingCart
                  size={24}
                  className="text-gray-700 group-hover:text-blue-600 transition"
                />
                {cart.totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {cart.totalQuantity}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate(`/profile/${user.id}`)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all"
              >
                <div className="p-2 bg-purple-100 rounded-xl">
                  <User className="text-purple-600" size={18} />
                </div>
                <span className="hidden sm:inline font-medium text-gray-700">
                  {user.firstName}
                </span>
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl 
             bg-gray-200 text-gray-800 font-medium
             hover:bg-gray-300 transition-all duration-200
             shadow-sm hover:shadow-md"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
