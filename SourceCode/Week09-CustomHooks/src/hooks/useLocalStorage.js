// Tuần 9: Custom Hook — useLocalStorage
// State được đồng bộ với localStorage — dữ liệu tồn tại sau reload trang
import { useState } from 'react';

/**
 * useLocalStorage — useState nhưng persist vào localStorage
 * @param {string} key - Key trong localStorage
 * @param {any} initialValue - Giá trị mặc định nếu key chưa tồn tại
 * @returns {[any, Function]} - [storedValue, setValue]
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Cho phép value là function (giống setState)
      const valueToStore = typeof value === 'function' ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.error('useLocalStorage error:', err);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

// ===== Cách dùng cho wishlist =====
// const [wishlist, setWishlist] = useLocalStorage('readmore_wishlist', []);
//
// const toggleWishlist = (book) => {
//   setWishlist((prev) =>
//     prev.find((b) => b.id === book.id)
//       ? prev.filter((b) => b.id !== book.id)
//       : [...prev, book]
//   );
// };
