// Tuần 6: Dynamic Route — dùng useParams để đọc :id từ URL
import { useParams, useNavigate, Link } from 'react-router-dom';

// Dữ liệu mock (tuần 8 sẽ thay bằng axios)
const BOOKS = [
  { id: 1, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: 86000, originalPrice: 120000, category: 'Kỹ năng sống', cover: 'https://picsum.photos/seed/book1/200/280', rating: 4.8, reviewCount: 1250, stock: 50, description: 'Cuốn sách bán chạy nhất mọi thời đại về nghệ thuật giao tiếp.' },
  { id: 2, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 79000, originalPrice: 95000, category: 'Văn học', cover: 'https://picsum.photos/seed/book2/200/280', rating: 4.7, reviewCount: 980, stock: 30, description: 'Câu chuyện về một cậu bé chăn cừu theo đuổi giấc mơ của mình.' },
];

function BookDetailPage() {
  // useParams: đọc giá trị :id từ URL /books/:id
  const { id } = useParams();
  const navigate = useNavigate();

  // Tìm sách theo id từ URL
  const book = BOOKS.find((b) => b.id === parseInt(id));

  // Xử lý không tìm thấy sách
  if (!book) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>😕 Không tìm thấy sách</h2>
        <p style={{ color: '#666' }}>ID #{id} không tồn tại trong hệ thống.</p>
        <button
          onClick={() => navigate('/books')}
          style={{ padding: '10px 24px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          ← Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
      {/* Breadcrumb dùng Link */}
      <nav style={{ marginBottom: '24px', color: '#666', fontSize: '14px' }}>
        <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>Trang chủ</Link>
        {' > '}
        <Link to="/books" style={{ color: '#3498db', textDecoration: 'none' }}>Sách</Link>
        {' > '}
        <span>{book.title}</span>
      </nav>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Ảnh bìa */}
        <img src={book.cover} alt={book.title}
          style={{ width: '220px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }} />

        {/* Thông tin */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <span style={{ backgroundColor: '#ebf5fb', color: '#3498db', padding: '3px 10px', borderRadius: '12px', fontSize: '12px' }}>
            {book.category}
          </span>
          <h1 style={{ fontSize: '26px', margin: '12px 0 4px' }}>{book.title}</h1>
          <p style={{ color: '#666', marginBottom: '12px' }}>Tác giả: <strong>{book.author}</strong></p>

          <div style={{ color: '#f39c12', marginBottom: '16px' }}>
            {'★'.repeat(Math.floor(book.rating))} {book.rating} ({book.reviewCount} đánh giá)
          </div>

          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#e74c3c' }}>
              {book.price.toLocaleString('vi-VN')}đ
            </span>
            {' '}
            <span style={{ fontSize: '16px', color: '#999', textDecoration: 'line-through' }}>
              {book.originalPrice.toLocaleString('vi-VN')}đ
            </span>
          </div>

          <p style={{ color: '#444', lineHeight: '1.6', marginBottom: '24px' }}>{book.description}</p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '12px 28px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
              🛒 Thêm vào giỏ
            </button>
            {/* useNavigate: điều hướng bằng code */}
            <button
              onClick={() => navigate(-1)}
              style={{ padding: '12px 20px', backgroundColor: '#ecf0f1', color: '#333', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px' }}
            >
              ← Quay lại
            </button>
          </div>

          <p style={{ marginTop: '16px', fontSize: '13px', color: book.stock > 0 ? '#27ae60' : '#e74c3c' }}>
            {book.stock > 0 ? `✓ Còn hàng (${book.stock} cuốn)` : '✗ Hết hàng'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
