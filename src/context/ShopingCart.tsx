"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  saveCartToLocalStorage,
  getCartFromLocalStorage,
} from "../utils/localStorage";

export interface ICartItem {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
}

interface IShoppingCartContext {
  cartItems: ICartItem[];
  handleIncreaseProductQuantity: (product: ICartItem) => void;
  handleDecreaseProductQuantity: (id: number) => void;
  clearCart: () => void;
  getProductQuantity: (id: number) => number;
  cartTotalQuantity: number;
  totalPrice: () => number;
}

const ShoppingCartContext = createContext<IShoppingCartContext | undefined>(
  undefined
);

export const ShoppingCartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    if (Array.isArray(savedCart)) {
      setCartItems(savedCart);
    }
  }, []);
  useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  const handleIncreaseProductQuantity = (product: ICartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleDecreaseProductQuantity = (id: number) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // حذف محصولاتی که تعدادشان به صفر می‌رسد
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getProductQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const cartTotalQuantity = cartItems.reduce((totalQty, item) => {
    return totalQty + item.quantity;
  }, 0);

  const totalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        handleIncreaseProductQuantity,
        handleDecreaseProductQuantity,
        clearCart,
        getProductQuantity,
        cartTotalQuantity,
        totalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
};
