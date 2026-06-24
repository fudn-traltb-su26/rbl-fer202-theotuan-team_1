// Tuần 4: BookGrid — nhận books[] (đã filtered) và onAddToCart qua props

function BookGrid({ books, onAddToCart }) {
  if (books.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
        <div style={{ fontSize: '48px' }}>📭</div>
        <p>Không tìm thấy sách phù hợp.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {books.map((book) => (
        <div
          key={book.id}
          style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', width: '200px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        >
          <img src={book.cover} alt={book.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
          <div style={{ padding: '12px' }}>
            <span style={{ fontSize: '11px', color: '#3498db', backgroundColor: '#ebf5fb', padding: '2px 6px', borderRadius: '10px' }}>
              {book.category}
            </span>
            <h4 style={{ fontSize: '14px', margin: '6px 0 4px', fontWeight: 'bold' }}>{book.title}</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>{book.author}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>{book.price.toLocaleString('vi-VN')}đ</span>
              <span style={{ fontSize: '11px', color: '#999', textDecoration: 'line-through' }}>{book.originalPrice.toLocaleString('vi-VN')}đ</span>
            </div>
            {/* onClick truyền book object lên App qua props callback */}
            <button
              onClick={() => onAddToCart(book)}
              disabled={book.stock === 0}
              style={{
                width: '100%', padding: '7px', border: 'none', borderRadius: '4px', cursor: book.stock === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: book.stock === 0 ? '#ccc' : '#3498db', color: 'white', fontSize: '13px'
              }}
            >
              {book.stock === 0 ? 'Hết hàng' : '🛒 Thêm vào giỏ'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookGrid;
