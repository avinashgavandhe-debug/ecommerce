import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";

const Cart = ({ onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {cart.products.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.products.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-blue-600 font-bold mb-2">
                        ${item.price}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Items:</span>
                  <span>{cart.totalQuantity}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-blue-600">
                  <span>Total:</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <button
                  onClick={clearCart}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium mt-4"
                >
                  Clear Cart
                </button>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
