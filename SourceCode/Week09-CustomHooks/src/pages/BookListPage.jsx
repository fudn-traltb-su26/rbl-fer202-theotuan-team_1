// Tuần 9: Refactored BookListPage — dùng custom hooks
// So sánh với Week07 để thấy code gọn hơn như thế nào
import { useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import useLocalStorage from '../hooks/useLocalStorage';
import { useCart } from '../context/CartContext';

const API_URL = 'http://localhost:3001/books';

function BookListPage() {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // 🎣 Custom hooks — logic được tái sử dụng, component chỉ lo UI
  const debouncedKeyword = useDebounce(keyword, 400);
  const [wishlist, setWishlist] = useLocalStorage('readmore_wishlist', []);
  const { addToCart } = useCart();

  // useFetch tự động re-fetch khi params thay đổi
  const { data: books, loading, error, refetch } = useFetch(API_URL, {
    q: debouncedKeyword || undefined,
    category: selectedCategory || undefined,
  });

  const { data: categories } = useFetch('http://localhost:3001/categories');

  const isInWishlist = (bookId) => wishlist.some((b) => b.id === bookId);

  const toggleWishlist = (book) => {
    setWishlist((prev) =>
      isInWishlist(book.id) ? prev.filter((b) => b.id !== book.id) : [...prev, book]
    );
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Danh sách sách</h2>

      {/* Search */}
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm kiếm... (debounce 400ms)"
        className="form-control mb-3"
      />

      {/* Filter danh mục */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        <button
          className={`btn btn-sm ${!selectedCategory ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setSelectedCategory('')}
        >Tất cả</button>
        {(categories || []).map((cat) => (
          <button
            key={cat.id}
            className={`btn btn-sm ${selectedCategory === cat.name ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* States */}
      {loading && <div className="text-center py-5"><Spinner animation="border" /><p>Đang tải...</p></div>}
      {error && <Alert variant="danger">{error} <button onClick={refetch} className="btn btn-sm btn-danger ms-2">Thử lại</button></Alert>}
      {!loading && !error && books?.length === 0 && (
        <Alert variant="info">Không tìm thấy sách phù hợp.</Alert>
      )}

      {/* Book Grid */}
      <Row xs={2} sm={3} md={4} lg={5} className="g-3">
        {(books || []).map((book) => (
          <Col key={book.id}>
            <div className="card h-100 shadow-sm">
              <div style={{ position: 'relative' }}>
                <img src={book.cover} alt={book.title} className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} />
                {/* Nút wishlist dùng useLocalStorage */}
                <button
                  onClick={() => toggleWishlist(book)}
                  style={{ position: 'absolute', top: '8px', right: '8px', background: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '16px' }}
                >
                  {isInWishlist(book.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="card-body p-2">
                <h6 className="card-title" style={{ fontSize: '13px' }}>{book.title}</h6>
                <p className="text-muted" style={{ fontSize: '11px' }}>{book.author}</p>
                <strong className="text-danger">{Number(book.price).toLocaleString('vi-VN')}đ</strong>
              </div>
              <div className="card-footer p-2">
                <button className="btn btn-primary btn-sm w-100" onClick={() => addToCart(book)}>
                  + Giỏ hàng
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BookListPage;
