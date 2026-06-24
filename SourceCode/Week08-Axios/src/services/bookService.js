// Tuần 8: Service layer — tách biệt API calls khỏi components
// Chạy json-server: npx json-server --watch db.json --port 3001
import axios from 'axios';

// Tạo axios instance với baseURL cố định
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// ============================================================
// BOOK APIs
// ============================================================

// GET /books — Lấy danh sách sách, hỗ trợ filter/sort/search
export const getBooks = async (params = {}) => {
  const response = await api.get('/books', { params });
  return response.data;
};

// GET /books/:id — Lấy 1 sách theo id
export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// POST /books — Tạo sách mới
export const createBook = async (bookData) => {
  const response = await api.post('/books', bookData);
  return response.data;
};

// PUT /books/:id — Cập nhật toàn bộ sách (replace)
export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

// PATCH /books/:id — Cập nhật một phần sách
export const patchBook = async (id, partialData) => {
  const response = await api.patch(`/books/${id}`, partialData);
  return response.data;
};

// DELETE /books/:id — Xóa sách
export const deleteBook = async (id) => {
  await api.delete(`/books/${id}`);
  return id; // trả về id để component cập nhật state
};

// ============================================================
// CATEGORY APIs
// ============================================================
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

// ============================================================
// Interceptors — xử lý lỗi toàn cục
// ============================================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.config.url);
    } else if (error.response?.status >= 500) {
      console.error('Server error:', error.message);
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    return Promise.reject(error);
  }
);

export default api;
