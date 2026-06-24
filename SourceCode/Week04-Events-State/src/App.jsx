// Tuần 4: Lifting State Up — App quản lý state dùng chung cho nhiều component
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';
import Footer from './components/Footer';

const ALL_BOOKS = [
  { id: 1, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: 86000, originalPrice: 120000, category: 'Kỹ năng sống', categoryId: 1, cover: 'https://picsum.photos/seed/book1/200/280', rating: 4.8, reviewCount: 1250, stock: 50 },
  { id: 2, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 79000, originalPrice: 95000, category: 'Văn học', categoryId: 2, cover: 'https://picsum.photos/seed/book2/200/280', rating: 4.7, reviewCount: 980, stock: 30 },
  { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', price: 185000, originalPrice: 230000, category: 'Lịch sử', categoryId: 3, cover: 'https://picsum.photos/seed/book3/200/280', rating: 4.9, reviewCount: 2100, stock: 25 },
  { id: 4, title: 'Hoàng Tử Bé', author: 'Antoine de Saint-Exupéry', price: 55000, originalPrice: 70000, category: 'Văn học', categoryId: 2, cover: 'https://picsum.photos/seed/book7/200/280', rating: 4.9, reviewCount: 3200, stock: 100 },
  { id: 5, title: 'Clean Code', author: 'Robert C. Martin', price: 210000, originalPrice: 250000, category: 'Lập trình', categoryId: 5, cover: 'https://picsum.photos/seed/book5/200/280', rating: 4.8, reviewCount: 1800, stock: 40 },
];

function App() {
  // === STATE ===
  // cart: mảng các item trong giỏ hàng
  const [cart, setCart] = useState([]);
  // keyword: từ khóa tìm kiếm hiện tại
  const [keyword, setKeyword] = useState('');
  // activeCategory: danh mục đang lọc (null = tất cả)
  const [activeCategory, setActiveCategory] = useState(null);

  // === DERIVED STATE: tính toán từ state, không cần lưu thêm ===
  const filteredBooks = ALL_BOOKS.filter((book) => {
    const matchKeyword = keyword === '' ||
      book.title.toLowerCase().includes(keyword.toLowerCase()) ||
      book.author.toLowerCase().includes(keyword.toLowerCase());
    const matchCategory = activeCategory === null || book.categoryId === activeCategory;
    return matchKeyword && matchCategory;
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // === EVENT HANDLERS ===
  // Lifting State Up: SearchBar gọi hàm này để cập nhật keyword ở App
  const handleSearch = (kw) => {
    setKeyword(kw);
  };

  // Thêm sách vào giỏ — immutable update pattern
  const handleAddToCart = (book) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === book.id);
      if (existing) {
        // Cập nhật số lượng — KHÔNG mutate trực tiếp, tạo array mới
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Thêm item mới vào cuối array — spread operator tạo array mới
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  return (
    <div>
      {/* Truyền totalItems xuống Header qua props */}
      <Header cartCount={totalItems} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          {/* SearchBar nhận hàm handleSearch — lifting state up */}
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filter theo danh mục */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {[null, 1, 2, 3, 4, 5].map((catId) => (
            <button
              key={catId ?? 'all'}
              onClick={() => setActiveCategory(catId)}
              style={{
                padding: '6px 16px',
                backgroundColor: activeCategory === catId ? '#3498db' : '#f0f0f0',
                color: activeCategory === catId ? 'white' : '#333',
                border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px'
              }}
            >
              {catId === null ? 'Tất cả' : ['', 'Kỹ năng', 'Văn học', 'Lịch sử', 'Tâm lý', 'Lập trình'][catId]}
            </button>
          ))}
        </div>

        {/* Kết quả tìm kiếm */}
        {keyword && (
          <p style={{ color: '#666', marginBottom: '16px' }}>
            Tìm thấy <strong>{filteredBooks.length}</strong> kết quả cho "{keyword}"
          </p>
        )}

        <BookGrid books={filteredBooks} onAddToCart={handleAddToCart} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
