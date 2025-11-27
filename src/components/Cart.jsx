import { useState } from "react";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
  ShoppingBag,
  CreditCard,
  Tag,
} from "lucide-react";
import { useCart } from "../hooks/useCart";

const Cart = ({ onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
              <p className="text-blue-100 text-sm">
                {cart.totalQuantity}
                {cart.totalQuantity === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="text-white" size={22} />
          </button>
        </div>

        {cart.products.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={64} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Add items to get started with your shopping
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-4">
                {cart.products.map((item, index) => (
                  <div
                    key={item.id}
                    className="group bg-white border-2 border-gray-100 hover:border-blue-200 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-xl ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all"
                        />
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                          {item.quantity}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight pr-2">
                            {item.title}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group/delete flex-shrink-0"
                            title="Remove item"
                          >
                            <Trash2
                              size={18}
                              className="text-gray-400 group-hover/delete:text-red-600 transition-colors"
                            />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <Tag size={14} className="text-blue-600" />
                          <span className="text-lg font-bold text-blue-600">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-xs text-gray-500">
                              (${(item.price * item.quantity).toFixed(2)} total)
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all"
                          >
                            <Minus size={14} className="text-gray-700" />
                          </button>
                          <span className="w-12 text-center font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all shadow-sm hover:shadow-md"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Summary */}
            <div className="border-t-2 border-gray-100 bg-gradient-to-b from-gray-50 to-white px-6 py-6">
              {/* Subtotal Breakdown */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${cart.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 font-medium">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      ${cart.total.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {cart.totalQuantity}{" "}
                      {cart.totalQuantity === 1 ? "item" : "items"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl transition-all font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                  <CreditCard
                    size={22}
                    className="group-hover:scale-110 transition-transform"
                  />
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-white border-2 border-red-200 text-red-600 py-3 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all font-semibold flex items-center justify-center gap-2 group"
                >
                  <Trash2
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
