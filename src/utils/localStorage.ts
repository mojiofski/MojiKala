// utils/localStorage.ts

import { ICartItem } from "@/context/ShopingCart";

export const saveCartToLocalStorage = (cart: ICartItem[]) => {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
};

export const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("shoppingCart");
  return cart ? JSON.parse(cart) : [];
};
