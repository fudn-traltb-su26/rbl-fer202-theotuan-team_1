// Tuần 3: BookGrid nhận books[] và onAddToCart qua props
import BookCard from './BookCard';

function BookGrid({ books, onAddToCart }) {
  if (books.length === 0) {
    return <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>Không có sách nào.</p>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {books.map((book) => (
        // key prop bắt buộc khi render list
        <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default BookGrid;
