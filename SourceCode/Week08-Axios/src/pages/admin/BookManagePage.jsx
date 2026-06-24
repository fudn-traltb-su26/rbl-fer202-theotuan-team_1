// Tuần 8: Full CRUD với Axios + json-server + loading/error state
import { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { getBooks, createBook, updateBook, deleteBook } from '../../services/bookService';

const EMPTY_FORM = { title: '', author: '', price: '', originalPrice: '', category: '', stock: '', description: '' };

function BookManagePage() {
  // Data state
  const [books, setBooks] = useState([]);
  // Async state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  // UI state
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null); // null = thêm mới
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch danh sách khi component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError('Không thể tải danh sách sách. Vui lòng thử lại.');
    } finally {
      setLoading(false); // Luôn tắt loading dù thành công hay lỗi
    }
  };

  // Validate form
  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Vui lòng nhập tên sách';
    if (!formData.author.trim()) errs.author = 'Vui lòng nhập tác giả';
    if (!formData.price || formData.price <= 0) errs.price = 'Giá phải lớn hơn 0';
    return errs;
  };

  // Mở modal thêm mới
  const handleAdd = () => {
    setEditingBook(null);
    setFormData(EMPTY_FORM);
    setFormError({});
    setShowModal(true);
  };

  // Mở modal sửa
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      originalPrice: book.originalPrice || '',
      category: book.category || '',
      stock: book.stock || '',
      description: book.description || '',
    });
    setFormError({});
    setShowModal(true);
  };

  // Submit form (tạo mới hoặc cập nhật)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFormError(errs);
      return;
    }

    try {
      setSaving(true);
      const payload = { ...formData, price: Number(formData.price), originalPrice: Number(formData.originalPrice), stock: Number(formData.stock) };

      if (editingBook) {
        // PUT — cập nhật
        const updated = await updateBook(editingBook.id, payload);
        setBooks((prev) => prev.map((b) => b.id === updated.id ? updated : b));
        showSuccess('Cập nhật sách thành công!');
      } else {
        // POST — tạo mới
        const created = await createBook({ ...payload, cover: `https://picsum.photos/seed/book${Date.now()}/200/280`, rating: 0, reviewCount: 0, featured: false });
        setBooks((prev) => [...prev, created]);
        showSuccess('Thêm sách thành công!');
      }
      setShowModal(false);
    } catch (err) {
      setFormError({ submit: 'Có lỗi xảy ra. Vui lòng thử lại.' });
    } finally {
      setSaving(false);
    }
  };

  // Xóa sách
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Bạn có chắc muốn xóa "${title}"?`)) return;
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      showSuccess('Xóa sách thành công!');
    } catch {
      setError('Không thể xóa sách. Vui lòng thử lại.');
    }
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000); // Tự ẩn sau 3 giây
  };

  // Render loading
  if (loading) return (
    <Container className="py-5 text-center">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">Đang tải...</p>
    </Container>
  );

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📚 Quản lý sách</h2>
        <Button variant="primary" onClick={handleAdd}>+ Thêm sách</Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th><th>Tên sách</th><th>Tác giả</th><th>Giá</th><th>Danh mục</th><th>Tồn kho</th><th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td><strong>{book.title}</strong></td>
              <td>{book.author}</td>
              <td>{Number(book.price).toLocaleString('vi-VN')}đ</td>
              <td><Badge bg="info">{book.category}</Badge></td>
              <td>
                <Badge bg={book.stock > 10 ? 'success' : book.stock > 0 ? 'warning' : 'danger'}>
                  {book.stock}
                </Badge>
              </td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEdit(book)}>Sửa</Button>
                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(book.id, book.title)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Thêm/Sửa */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingBook ? 'Sửa sách' : 'Thêm sách mới'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {formError.submit && <Alert variant="danger">{formError.submit}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Tên sách *</Form.Label>
              <Form.Control value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} isInvalid={!!formError.title} />
              <Form.Control.Feedback type="invalid">{formError.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tác giả *</Form.Label>
              <Form.Control value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} isInvalid={!!formError.author} />
              <Form.Control.Feedback type="invalid">{formError.author}</Form.Control.Feedback>
            </Form.Group>
            <div className="row">
              <Form.Group className="mb-3 col-6">
                <Form.Label>Giá bán *</Form.Label>
                <Form.Control type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} isInvalid={!!formError.price} />
                <Form.Control.Feedback type="invalid">{formError.price}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label>Giá gốc</Form.Label>
                <Form.Control type="number" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })} />
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="mb-3 col-6">
                <Form.Label>Danh mục</Form.Label>
                <Form.Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  <option value="">-- Chọn danh mục --</option>
                  <option>Kỹ năng sống</option>
                  <option>Văn học</option>
                  <option>Lịch sử</option>
                  <option>Tâm lý học</option>
                  <option>Lập trình</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label>Tồn kho</Form.Label>
                <Form.Control type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
              </Form.Group>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control as="textarea" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? <><Spinner size="sm" /> Đang lưu...</> : (editingBook ? 'Cập nhật' : 'Thêm mới')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default BookManagePage;
