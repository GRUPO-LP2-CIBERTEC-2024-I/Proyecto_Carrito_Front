import { useState } from 'react';

// Extiende el tipo para incluir más propiedades
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number; // Nueva propiedad para manejar cantidades
  image?: string; // Propiedad opcional para imágenes
}

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Lista de elementos del carrito
  const [total, setTotal] = useState<number>(0); // Total del carrito

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      setTotal(total + item.price);
    } else {
      // Si el producto no está en el carrito, agrégalo
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      setTotal(total + item.price);
    }
  };

  const removeFromCart = (itemId: number) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);

    if (itemToRemove) {
      if (itemToRemove.quantity > 1) {
        // Si la cantidad es mayor a 1, reduce la cantidad
        setCartItems(
          cartItems.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
        setTotal(total - itemToRemove.price);
      } else {
        // Si la cantidad es 1, elimina el producto del carrito
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

export default useCart;