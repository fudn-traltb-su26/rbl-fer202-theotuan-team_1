// Tuần 10: Final App — tích hợp đầy đủ tất cả kiến thức
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

// Code splitting — lazy load các pages chỉ khi cần
const HomePage = lazy(() => import('./pages/HomePage'));
const BookListPage = lazy(() => import('./pages/BookListPage'));
const BookDetailPage = lazy(() => import('./pages/BookDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const AdminBookPage = lazy(() => import('./pages/admin/BookManagePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function AppRoutes() {
  const { isAdmin } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books" element={<BookListPage />} />
      <Route path="/books/:id" element={<BookDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/admin/books"
        element={
          <ProtectedRoute isAllowed={isAdmin} redirectTo="/">
            <AdminBookPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    // Provider nesting: AuthProvider bọc ngoài cùng
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1 }}>
              {/* Suspense: hiển thị fallback khi lazy component đang load */}
              <Suspense fallback={<LoadingSpinner message="Đang tải trang..." />}>
                <AppRoutes />
              </Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
