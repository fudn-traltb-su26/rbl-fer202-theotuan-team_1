// Tuần 7: useEffect + useRef + useCart (useContext)
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

const ALL_BOOKS = [
  { id: 1, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: 86000, originalPrice: 120000, category: 'Kỹ năng sống', categoryId: 1, cover: 'https://picsum.photos/seed/book1/200/280', rating: 4.8, reviewCount: 1250, stock: 50 },
  { id: 2, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 79000, originalPrice: 95000, category: 'Văn học', categoryId: 2, cover: 'https://picsum.photos/seed/book2/200/280', rating: 4.7, reviewCount: 980, stock: 30 },
  { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', price: 185000, originalPrice: 230000, category: 'Lịch sử', categoryId: 3, cover: 'https://picsum.photos/seed/book3/200/280', rating: 4.9, reviewCount: 2100, stock: 25 },
];

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  // useContext qua custom hook
  const { addToCart, totalItems } = useCart();

  // useRef: truy cập DOM element trực tiếp (không trigger re-render)
  const searchInputRef = useRef(null);

  // useEffect #1: Giả lập fetch dữ liệu khi component mount
  // Dependency array [] = chỉ chạy 1 lần sau mount
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setBooks(ALL_BOOKS);
      setLoading(false);
    }, 800); // Giả lập network delay

    // Cleanup function: hủy timer nếu component unmount trước khi timer kết thúc
    return () => clearTimeout(timer);
  }, []); // ← [] = run once on mount

  // useEffect #2: Focus vào search input sau khi dữ liệu tải xong
  // Dependency: [loading] = chạy mỗi khi loading thay đổi
  useEffect(() => {
    if (!loading && searchInputRef.current) {
      searchInputRef.current.focus(); // useRef: truy cập DOM
    }
  }, [loading]);

  // useEffect #3: Cập nhật title trang theo số sản phẩm trong giỏ
  useEffect(() => {
    document.title = totalItems > 0 ? `(${totalItems}) ReadMore` : 'ReadMore Bookstore';
    // Cleanup: reset title khi unmount
    return () => { document.title = 'ReadMore Bookstore'; };
  }, [totalItems]);

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(keyword.toLowerCase()) ||
    b.author.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div>⏳ Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <h1>Danh sách sách</h1>

      {/* useRef gắn vào input */}
      <input
        ref={searchInputRef}
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm kiếm..."
        style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {filtered.map((book) => (
          <div key={book.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '12px', width: '200px' }}>
            <img src={book.cover} alt={book.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '4px' }} />
            <h4 style={{ fontSize: '14px', margin: '8px 0 4px' }}>{book.title}</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{book.author}</p>
            <strong style={{ color: '#e74c3c' }}>{book.price.toLocaleString('vi-VN')}đ</strong>
            <button
              onClick={() => addToCart(book)} // Gọi từ CartContext
              style={{ display: 'block', width: '100%', marginTop: '8px', padding: '6px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              + Giỏ hàng
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookListPage;
