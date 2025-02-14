// utils/localStorage.ts

import { ICartItem } from "@/context/ShopingCart";

export const saveCartToLocalStorage = (cart: ICartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }
};

export const getCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("shoppingCart");
    return cart ? JSON.parse(cart) : [];
  }
};
