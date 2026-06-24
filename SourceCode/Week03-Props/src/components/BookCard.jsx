// Tuần 3: BookCard nhận dữ liệu qua PROPS

function BookCard({ book, onAddToCart }) {
  const discountPercent = Math.round((1 - book.price / book.originalPrice) * 100);

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '200px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      position: 'relative'
    }}>
      {/* Badge giảm giá — conditional rendering */}
      {discountPercent > 0 && (
        <span style={{
          position: 'absolute', top: '8px', left: '8px',
          backgroundColor: '#e74c3c', color: 'white',
          fontSize: '11px', padding: '2px 6px', borderRadius: '4px'
        }}>
          -{discountPercent}%
        </span>
      )}

      <img
        src={book.cover}
        alt={book.title}
        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
      />

      <div style={{ padding: '12px' }}>
        <span style={{ fontSize: '11px', color: '#3498db', backgroundColor: '#ebf5fb', padding: '2px 6px', borderRadius: '10px' }}>
          {book.category}
        </span>
        <h4 style={{ fontSize: '14px', margin: '6px 0 4px', fontWeight: 'bold' }}>
          {book.title}
        </h4>
        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>
          {book.author}
        </p>

        {/* Hiển thị rating */}
        <div style={{ fontSize: '12px', color: '#f39c12', marginBottom: '8px' }}>
          {'★'.repeat(Math.floor(book.rating))} ({book.reviewCount})
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '15px' }}>
            {book.price.toLocaleString('vi-VN')}đ
          </span>
          {book.originalPrice > book.price && (
            <span style={{ fontSize: '11px', color: '#999', textDecoration: 'line-through' }}>
              {book.originalPrice.toLocaleString('vi-VN')}đ
            </span>
          )}
        </div>

        {/* Truyền function prop để xử lý sự kiện ở component cha */}
        <button
          onClick={() => onAddToCart(book)}
          disabled={book.stock === 0}
          style={{
            width: '100%', marginTop: '8px', padding: '7px',
            backgroundColor: book.stock === 0 ? '#ccc' : '#3498db',
            color: 'white', border: 'none', borderRadius: '4px',
            cursor: book.stock === 0 ? 'not-allowed' : 'pointer', fontSize: '13px'
          }}
        >
          {book.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
        </button>
      </div>
    </div>
  );
}

// Default props cho các props không bắt buộc

export default BookCard;
