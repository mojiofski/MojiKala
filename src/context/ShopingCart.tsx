"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ICartItems {
  id: number;
  quantity: number;
}

type TShopingCartContext = {
  cartItems: ICartItems[];
  handleIncreaseProductQuantity: (id: number) => void;
  handleDecreaseProductQuantity: (id: number) => void;
  getProductQuantity: (id: number) => number;
  cartTotalQuantity: number;
};
const shoppingCartContext = createContext({} as TShopingCartContext);
const ShopingCartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<ICartItems[]>(() => {
    const savedCarts = localStorage.getItem("cart");
    return savedCarts ? JSON.parse(savedCarts) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartTotalQuantity = useMemo(() => {
    return cartItems.reduce(
      (totalQuantity, item) => totalQuantity + item.quantity,
      0
    );
  }, [cartItems]);

  const getProductQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const handleIncreaseProductQuantity = (id: number) => {
    setCartItems((currentItems) => {
      const isNotProductExist =
        currentItems.find((item) => item.id === id) === undefined;
      if (isNotProductExist) {
        return [...currentItems, { id: id, quantity: 1 }];
      } else {
        return currentItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });
  };

  const handleDecreaseProductQuantity = (id: number) => {
    setCartItems((currentItems) => {
      const isLastOne =
        currentItems.find((item) => item.id === id)?.quantity === 1;
      if (isLastOne) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };
  return (
    <shoppingCartContext.Provider
      value={{
        cartItems,
        handleIncreaseProductQuantity,
        handleDecreaseProductQuantity,
        getProductQuantity,
        cartTotalQuantity,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
};

export const useShopingCartContext = () => {
  return useContext(shoppingCartContext);
};

export default ShopingCartContextProvider;
