// Tuần 9: Custom Hook — useDebounce
// Trì hoãn cập nhật value để tránh fetch quá nhiều lần khi user gõ
import { useState, useEffect } from 'react';

/**
 * useDebounce — Trả về giá trị đã được debounce
 * @param {any} value - Giá trị cần debounce
 * @param {number} delay - Thời gian delay (ms), mặc định 500ms
 * @returns {any} - Giá trị debounced
 */
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timer: cập nhật debouncedValue sau `delay` ms
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: hủy timer nếu value thay đổi trước khi timer chạy xong
    // → Chỉ cập nhật khi user dừng gõ trong `delay` ms
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

// ===== Cách dùng trong SearchBar =====
// const [keyword, setKeyword] = useState('');
// const debouncedKeyword = useDebounce(keyword, 500);
//
// useEffect(() => {
//   if (debouncedKeyword) {
//     fetchBooks({ q: debouncedKeyword }); // Chỉ gọi API sau 500ms user ngừng gõ
//   }
// }, [debouncedKeyword]);
