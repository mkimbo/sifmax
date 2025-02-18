"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Service = {
  id: string;
  title: string;
  price: string;
};

type CartContextType = {
  cart: Service[];
  addToCart: (service: Service) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  //totalPrice: number;
  isCartOpen: boolean;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Service[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (service: Service) => {
    setCart((prevCart) => [...prevCart, service]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const isInCart = (id: string) => cart.some((item) => item.id === id);

  //const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isInCart,
        // totalPrice,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
