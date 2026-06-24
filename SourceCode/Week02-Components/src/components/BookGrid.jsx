// Tuần 2: Render danh sách — dùng map() với dữ liệu hardcode
// Chú ý: key prop là bắt buộc khi render list

const BOOKS_DATA = [
  { id: 1, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: 86000 },
  { id: 2, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 79000 },
  { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', price: 185000 },
  { id: 4, title: 'Hoàng Tử Bé', author: 'Antoine de Saint-Exupéry', price: 55000 },
];

function BookGrid() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {/* map() - render mỗi item thành một JSX element */}
      {BOOKS_DATA.map((book) => (
        <div
          key={book.id}  // ← key là bắt buộc, giúp React nhận diện element
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '12px',
            width: '200px'
          }}
        >
          <img
            src={`https://picsum.photos/seed/book${book.id}/200/280`}
            alt={book.title}
            style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '4px' }}
          />
          <h4 style={{ fontSize: '14px', marginTop: '8px' }}>{book.title}</h4>
          <p style={{ fontSize: '12px', color: '#666' }}>{book.author}</p>
          <strong style={{ color: '#e74c3c' }}>
            {book.price.toLocaleString('vi-VN')}đ
          </strong>
        </div>
      ))}
    </div>
  );
}

export default BookGrid;
