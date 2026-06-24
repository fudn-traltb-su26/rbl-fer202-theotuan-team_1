// Tuần 6: React Router DOM — Cấu hình routes cho toàn app
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import AdminBookPage from './pages/AdminBookPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  // Mock auth state — tuần 7 sẽ chuyển vào Context
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1 }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BookListPage />} />

            {/* Dynamic route: /books/1, /books/42, ... */}
            <Route path="/books/:id" element={<BookDetailPage />} />

            <Route path="/cart" element={<CartPage />} />

            {/* Protected route: chỉ admin mới vào được */}
            <Route
              path="/admin/books"
              element={
                <ProtectedRoute isAllowed={isAdmin} redirectTo="/">
                  <AdminBookPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all: 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
