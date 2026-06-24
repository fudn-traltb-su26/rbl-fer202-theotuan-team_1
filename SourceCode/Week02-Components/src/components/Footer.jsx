// Tuần 2: Static Footer component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#2c3e50', color: 'white', padding: '32px 24px', marginTop: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ color: '#f39c12' }}>📚 ReadMore</h3>
          <p style={{ color: '#bdc3c7', fontSize: '14px' }}>Nhà sách trực tuyến uy tín</p>
        </div>
        <div>
          <h4>Liên kết</h4>
          <ul style={{ listStyle: 'none', padding: 0, color: '#bdc3c7', fontSize: '14px' }}>
            <li>Trang chủ</li>
            <li>Danh sách sách</li>
            <li>Về chúng tôi</li>
          </ul>
        </div>
        <div>
          <h4>Liên hệ</h4>
          <p style={{ color: '#bdc3c7', fontSize: '14px' }}>📧 support@readmore.vn</p>
          <p style={{ color: '#bdc3c7', fontSize: '14px' }}>📞 1800 1234</p>
        </div>
      </div>
      <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '13px', marginTop: '24px', borderTop: '1px solid #34495e', paddingTop: '16px' }}>
        © {currentYear} ReadMore Bookstore. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
