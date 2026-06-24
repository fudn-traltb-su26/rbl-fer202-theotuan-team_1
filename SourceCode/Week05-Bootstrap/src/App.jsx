// Tuần 5: App.jsx — Toàn bộ dùng React-Bootstrap
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import HomePage from './pages/HomePage';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col md={4}><h5 className="text-warning">📚 ReadMore</h5><p className="text-muted small">Nhà sách trực tuyến uy tín</p></Col>
          <Col md={4}><h6>Liên kết nhanh</h6><ul className="list-unstyled text-muted small"><li>Trang chủ</li><li>Danh sách sách</li></ul></Col>
          <Col md={4}><h6>Liên hệ</h6><p className="text-muted small">📧 support@readmore.vn<br/>📞 1800 1234</p></Col>
        </Row>
        <hr className="border-secondary" />
        <p className="text-center text-muted small mb-0">© {new Date().getFullYear()} ReadMore Bookstore</p>
      </Container>
    </footer>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (book) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === book.id);
      if (existing) return prev.map((i) => i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header cartCount={totalItems} />
      <main className="flex-grow-1">
        <HomePage onAddToCart={handleAddToCart} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
