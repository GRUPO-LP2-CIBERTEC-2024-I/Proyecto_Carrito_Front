import { useState } from 'react';

interface AdvancedCartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const useAdvancedCart = () => {
  const [cartItems, setCartItems] = useState<AdvancedCartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addToCart = (item: AdvancedCartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      setTotal(total + item.price);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      setTotal(total + item.price);
    }
  };

  const removeFromCart = (itemId: number) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);

    if (itemToRemove) {
      if (itemToRemove.quantity > 1) {
        setCartItems(
          cartItems.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
        setTotal(total - itemToRemove.price);
      } else {
        const updatedCart = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCart);
        setTotal(total - itemToRemove.price);
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
  };

  return { cartItems, total, addToCart, removeFromCart, clearCart };
};

export default useAdvancedCart;