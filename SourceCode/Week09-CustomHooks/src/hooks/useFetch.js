// Tuần 9: Custom Hook — useFetch
// Tái sử dụng logic fetch + loading + error ở mọi component
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * useFetch — Fetch dữ liệu từ URL với loading/error state
 * @param {string} url - URL cần fetch
 * @param {object} params - Query params (optional)
 * @returns {{ data, loading, error, refetch }}
 */
function useFetch(url, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(url, { params });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;

// ===== Cách dùng =====
// const { data: books, loading, error, refetch } = useFetch('http://localhost:3001/books', { _sort: 'title' });
