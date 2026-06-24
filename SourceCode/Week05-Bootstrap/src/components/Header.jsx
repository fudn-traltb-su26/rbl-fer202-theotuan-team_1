// Tuần 5: Header dùng React-Bootstrap Navbar + NavLink từ react-router-dom
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Header({ cartCount = 0 }) {
  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
          📚 ReadMore
        </Navbar.Brand>

        {/* Toggle cho mobile */}
        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          {/* NavLink: tự thêm class "active" cho trang hiện tại */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Trang chủ</Nav.Link>
            <Nav.Link as={NavLink} to="/books">Sách</Nav.Link>
          </Nav>

          {/* Giỏ hàng với Badge */}
          <Nav>
            <Nav.Link as={NavLink} to="/cart" className="d-flex align-items-center gap-1">
              🛒 Giỏ hàng
              {cartCount > 0 && (
                <Badge bg="danger" pill>{cartCount}</Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
