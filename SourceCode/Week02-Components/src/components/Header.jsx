// Tuần 2: Static Functional Component - Header/Navbar
function Header() {
  return (
    <nav style={{ backgroundColor: '#2c3e50', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Logo */}
      <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
        📚 ReadMore
      </div>

      {/* Navigation links */}
      <ul style={{ listStyle: 'none', display: 'flex', gap: '24px', margin: 0, padding: 0 }}>
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Trang chủ</a></li>
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Sách</a></li>
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Danh mục</a></li>
        <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Liên hệ</a></li>
      </ul>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ color: 'white', cursor: 'pointer' }}>🔍</span>
        <span style={{ color: 'white', cursor: 'pointer' }}>🛒 0</span>
      </div>
    </nav>
  );
}

export default Header;
