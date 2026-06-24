// Tuần 2: Static BookCard — dữ liệu hardcode, chưa dùng props
function BookCard() {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '200px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      {/* Book cover */}
      <img
        src="https://picsum.photos/seed/book1/200/280"
        alt="Đắc Nhân Tâm"
        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
      />

      {/* Book info */}
      <div style={{ padding: '12px' }}>
        <h4 style={{ fontSize: '14px', margin: '0 0 4px', fontWeight: 'bold' }}>
          Đắc Nhân Tâm
        </h4>
        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>
          Dale Carnegie
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>86.000đ</span>
          <span style={{ fontSize: '11px', color: '#999', textDecoration: 'line-through' }}>120.000đ</span>
        </div>
        <button style={{
          width: '100%',
          marginTop: '8px',
          padding: '6px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '13px'
        }}>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

export default BookCard;
