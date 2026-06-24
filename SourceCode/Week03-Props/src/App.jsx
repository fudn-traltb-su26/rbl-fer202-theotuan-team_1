// Tuần 3: App.jsx — Lifting State Up + truyền dữ liệu qua Props
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import SectionWrapper from './components/SectionWrapper';
import CategoryList from './components/CategoryList';
import BookGrid from './components/BookGrid';
import Footer from './components/Footer';

// Dữ liệu hardcode — tuần 8 sẽ thay bằng Axios + json-server
const BOOKS = [
  { id: 1, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: 86000, originalPrice: 120000, category: 'Kỹ năng sống', cover: 'https://picsum.photos/seed/book1/200/280', rating: 4.8, reviewCount: 1250, stock: 50 },
  { id: 2, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 79000, originalPrice: 95000, category: 'Văn học', cover: 'https://picsum.photos/seed/book2/200/280', rating: 4.7, reviewCount: 980, stock: 30 },
  { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', price: 185000, originalPrice: 230000, category: 'Lịch sử', cover: 'https://picsum.photos/seed/book3/200/280', rating: 4.9, reviewCount: 2100, stock: 25 },
  { id: 4, title: 'Clean Code', author: 'Robert C. Martin', price: 210000, originalPrice: 250000, category: 'Lập trình', cover: 'https://picsum.photos/seed/book5/200/280', rating: 4.8, reviewCount: 1800, stock: 40 },
];

const CATEGORIES = [
  { id: 1, name: 'Kỹ năng sống', icon: '🌱' },
  { id: 2, name: 'Văn học', icon: '📖' },
  { id: 3, name: 'Lịch sử', icon: '🏛️' },
  { id: 4, name: 'Lập trình', icon: '💻' },
];

function App() {
  // Callback: xử lý ở App, truyền xuống component con qua props
  const handleAddToCart = (book) => {
    console.log('Thêm vào giỏ:', book.title);
    // Tuần 4 sẽ thêm state cart ở đây
  };

  return (
    <div>
      <Header cartCount={0} />
      <main>
        {/* SectionWrapper dùng props.children — tái sử dụng layout */}
        <SectionWrapper title="Danh mục sách" backgroundColor="#f8f9fa">
          <CategoryList categories={CATEGORIES} />
        </SectionWrapper>

        <SectionWrapper
          title="Sách nổi bật"
          subtitle="Được yêu thích nhất tuần này"
          backgroundColor="#ffffff"
        >
          {/* BookGrid nhận books[] và onAddToCart qua props */}
          <BookGrid books={BOOKS} onAddToCart={handleAddToCart} />
        </SectionWrapper>

        <SectionWrapper
          title="Sách mới nhất"
          subtitle="Vừa cập nhật kho"
          backgroundColor="#f0f7ff"
        >
          {/* Dùng lại BookGrid với slice khác — đây là điểm mạnh của reusable component */}
          <BookGrid books={BOOKS.slice(0, 2)} onAddToCart={handleAddToCart} />
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}

export default App;
