// Tuần 5: BookCard hoàn toàn dùng React-Bootstrap Card
import { Card, Badge, Button } from 'react-bootstrap';

function BookCard({ book, onAddToCart }) {
  const discountPct = book.originalPrice
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;

  return (
    <Card className="h-100 shadow-sm" style={{ width: '200px' }}>
      {/* Discount badge overlay */}
      {discountPct > 0 && (
        <Badge bg="danger" style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 1 }}>
          -{discountPct}%
        </Badge>
      )}

      <Card.Img
        variant="top"
        src={book.cover}
        alt={book.title}
        style={{ height: '180px', objectFit: 'cover' }}
      />

      <Card.Body className="p-2 d-flex flex-column">
        <Badge bg="info" className="mb-1 align-self-start" style={{ fontSize: '10px' }}>
          {book.category}
        </Badge>

        <Card.Title style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>
          {book.title}
        </Card.Title>

        <Card.Subtitle className="text-muted mb-2" style={{ fontSize: '11px' }}>
          {book.author}
        </Card.Subtitle>

        {/* Rating */}
        <div style={{ fontSize: '11px', color: '#f39c12', marginBottom: '6px' }}>
          {'★'.repeat(Math.floor(book.rating || 0))} ({book.reviewCount || 0})
        </div>

        {/* Price */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong className="text-danger">{book.price.toLocaleString('vi-VN')}đ</strong>
          {book.originalPrice > book.price && (
            <small className="text-muted text-decoration-line-through">
              {book.originalPrice.toLocaleString('vi-VN')}đ
            </small>
          )}
        </div>

        {/* Nút thêm vào giỏ */}
        <Button
          variant={book.stock === 0 ? 'secondary' : 'primary'}
          size="sm"
          className="w-100 mt-auto"
          disabled={book.stock === 0}
          onClick={() => onAddToCart(book)}
        >
          {book.stock === 0 ? 'Hết hàng' : '🛒 Thêm vào giỏ'}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
