import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Banner from './components/Banner';
import CategoryList from './components/CategoryList';
import BookGrid from './components/BookGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Banner />
        <div className="container my-4">
          <h2 className="mb-3">Danh mục sách</h2>
          <CategoryList />
          <h2 className="mt-4 mb-3">Sách nổi bật</h2>
          <BookGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
