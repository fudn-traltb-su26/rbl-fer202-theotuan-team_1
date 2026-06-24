// Tuần 2: Static Component - Banner quảng cáo
function Banner() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
      color: 'white',
      padding: '60px 40px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
        🌟 Chào mừng đến với ReadMore
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '24px', opacity: 0.9 }}>
        Kho sách đa dạng — Giao hàng nhanh — Giá tốt nhất
      </p>
      <button style={{
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        padding: '12px 32px',
        fontSize: '16px',
        borderRadius: '25px',
        cursor: 'pointer'
      }}>
        Khám phá ngay
      </button>
    </div>
  );
}

export default Banner;
