// Tuần 7: useContext + createContext — Global cart state
// Không cần props drilling — mọi component đều truy cập được giỏ hàng
import { createContext, useContext, useState, useCallback } from 'react';

// 1. Tạo Context
const CartContext = createContext(null);

// 2. Provider — bọc toàn bộ App
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // useCallback: tránh tạo function mới mỗi lần render
  const addToCart = useCallback((book) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((bookId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== bookId));
  }, []);

  const updateQuantity = useCallback((bookId, quantity) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== bookId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => item.id === bookId ? { ...item, quantity } : item)
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  // Derived values
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 3. Custom hook để dùng context — gọn hơn useContext(CartContext) mọi nơi
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart phải được dùng bên trong CartProvider');
  }
  return context;
}
