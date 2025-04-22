import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    setTotal((prevTotal) => prevTotal + item.price);
  };

  const removeFromCart = (id: string) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
  
    if (itemToRemove) {
      // Elimina el producto completamente del carrito
      setCartItems(cartItems.filter((item) => item.id !== id));
      
      // Resta el precio total del producto (precio unitario * cantidad)
      setTotal((prevTotal) => prevTotal - (itemToRemove.price * itemToRemove.quantity));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
  };

  const increaseQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      setCartItems(
          cartItems.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          )
      );
      setTotal((prevTotal) => prevTotal + item.price);
    }
  };

  const decreaseQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      if (item.quantity > 1) {
        setCartItems(
            cartItems.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
        );
        setTotal((prevTotal) => prevTotal - item.price);
      } else {
        removeFromCart(id); // usa la función que ya tenías para eliminar del todo
      }
    }
  };


  return (
    <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};