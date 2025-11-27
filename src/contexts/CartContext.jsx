import { createContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    products: [],
    total: 0,
    totalQuantity: 0,
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ products: [], total: 0, totalQuantity: 0 });
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;
    try {
      const response = await fetch(
        `https://dummyjson.com/carts/user/${user.id}`
      );
      const data = await response.json();

      if (data.carts && data.carts.length > 0) {
        const userCart = data.carts[0];
        setCart({
          products: userCart.products,
          total: userCart.total,
          totalQuantity: userCart.totalQuantity,
        });
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    const existingProduct = cart.products.find((p) => p.id === product.id);

    if (existingProduct) {
      await updateQuantity(product.id, existingProduct.quantity + 1);
    } else {
      try {
        const response = await fetch("https://dummyjson.com/carts/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            products: [{ id: product.id, quantity: 1 }],
          }),
        });

        if (response.ok) {
          const newProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            thumbnail: product.thumbnail,
          };

          setCart((prev) => ({
            products: [...prev.products, newProduct],
            total: prev.total + product.price,
            totalQuantity: prev.totalQuantity + 1,
          }));
        }
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    const product = cart.products.find((p) => p.id === productId);
    if (!product) return;

    const quantityDiff = quantity - product.quantity;
    const priceDiff = product.price * quantityDiff;

    setCart((prev) => ({
      products: prev.products.map((p) =>
        p.id === productId ? { ...p, quantity } : p
      ),
      total: prev.total + priceDiff,
      totalQuantity: prev.totalQuantity + quantityDiff,
    }));
  };

  const removeFromCart = async (productId) => {
    const product = cart.products.find((p) => p.id === productId);
    if (!product) return;

    try {
      const response = await fetch(`https://dummyjson.com/carts/${user.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCart((prev) => ({
          products: prev.products.filter((p) => p.id !== productId),
          total: prev.total - product.price * product.quantity,
          totalQuantity: prev.totalQuantity - product.quantity,
        }));
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const clearCart = () => {
    setCart({ products: [], total: 0, totalQuantity: 0 });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
