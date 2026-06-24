// Tuần 5: HomePage dùng React-Bootstrap hoàn toàn
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';

const BOOKS = [
  { id: 1, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: 86000, originalPrice: 120000, category: 'Kỹ năng sống', cover: 'https://picsum.photos/seed/book1/200/280', rating: 4.8, reviewCount: 1250, stock: 50 },
  { id: 2, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 79000, originalPrice: 95000, category: 'Văn học', cover: 'https://picsum.photos/seed/book2/200/280', rating: 4.7, reviewCount: 980, stock: 30 },
  { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', price: 185000, originalPrice: 230000, category: 'Lịch sử', cover: 'https://picsum.photos/seed/book3/200/280', rating: 4.9, reviewCount: 2100, stock: 25 },
  { id: 4, title: 'Clean Code', author: 'Robert C. Martin', price: 210000, originalPrice: 250000, category: 'Lập trình', cover: 'https://picsum.photos/seed/book5/200/280', rating: 4.8, reviewCount: 1800, stock: 40 },
  { id: 5, title: 'Hoàng Tử Bé', author: 'Antoine de Saint-Exupéry', price: 55000, originalPrice: 70000, category: 'Văn học', cover: 'https://picsum.photos/seed/book7/200/280', rating: 4.9, reviewCount: 3200, stock: 100 },
  { id: 6, title: 'Tư Duy Nhanh', author: 'Daniel Kahneman', price: 165000, originalPrice: 200000, category: 'Tâm lý học', cover: 'https://picsum.photos/seed/book4/200/280', rating: 4.6, reviewCount: 750, stock: 15 },
];

const CATEGORIES = [
  { id: 1, name: 'Kỹ năng sống', icon: '🌱', count: 24 },
  { id: 2, name: 'Văn học', icon: '📖', count: 56 },
  { id: 3, name: 'Lịch sử', icon: '🏛️', count: 18 },
  { id: 4, name: 'Tâm lý học', icon: '🧠', count: 32 },
  { id: 5, name: 'Lập trình', icon: '💻', count: 45 },
];

function HomePage({ onAddToCart }) {
  return (
    <>
      {/* ── BANNER (Jumbotron) ─────────────────────────── */}
      <div className="bg-dark text-white py-5">
        <Container className="text-center">
          <h1 className="display-4 fw-bold">📚 ReadMore</h1>
          <p className="lead">Kho sách đa dạng — Giao hàng nhanh — Giá tốt nhất</p>
          <Button variant="warning" size="lg" className="rounded-pill px-4">
            Khám phá ngay
          </Button>
        </Container>
      </div>

      {/* ── CATEGORIES ────────────────────────────────── */}
      <Container className="py-4">
        <h2 className="mb-3 fw-bold">Danh mục sách</h2>
        {/* Row với breakpoints responsive */}
        <Row xs={2} sm={3} md={5} className="g-3 mb-5">
          {CATEGORIES.map((cat) => (
            <Col key={cat.id}>
              <Card className="text-center h-100 border-0 shadow-sm" style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <div style={{ fontSize: '2rem' }}>{cat.icon}</div>
                  <Card.Title style={{ fontSize: '13px', marginTop: '8px' }}>{cat.name}</Card.Title>
                  <Badge bg="secondary" pill>{cat.count} cuốn</Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* ── FEATURED BOOKS ──────────────────────────── */}
        <h2 className="mb-3 fw-bold">Sách nổi bật</h2>
        <Row xs={2} sm={3} md={4} lg={6} className="g-3">
          {BOOKS.map((book) => {
            const discount = Math.round((1 - book.price / book.originalPrice) * 100);
            return (
              <Col key={book.id}>
                <Card className="h-100 shadow-sm">
                  <div style={{ position: 'relative' }}>
                    {discount > 0 && (
                      <Badge bg="danger" style={{ position: 'absolute', top: '6px', left: '6px', zIndex: 1 }}>
                        -{discount}%
                      </Badge>
                    )}
                    <Card.Img
                      variant="top"
                      src={book.cover}
                      style={{ height: '160px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body className="p-2">
                    <Badge bg="info" className="mb-1" style={{ fontSize: '10px' }}>{book.category}</Badge>
                    <Card.Title style={{ fontSize: '12px', fontWeight: 'bold' }}>{book.title}</Card.Title>
                    <Card.Text className="text-muted" style={{ fontSize: '11px' }}>{book.author}</Card.Text>
                    <strong className="text-danger d-block">{book.price.toLocaleString('vi-VN')}đ</strong>
                  </Card.Body>
                  <Card.Footer className="p-2 bg-white">
                    <Button
                      variant="primary" size="sm" className="w-100"
                      disabled={book.stock === 0}
                      onClick={() => onAddToCart(book)}
                    >
                      {book.stock === 0 ? 'Hết hàng' : '+ Giỏ hàng'}
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
