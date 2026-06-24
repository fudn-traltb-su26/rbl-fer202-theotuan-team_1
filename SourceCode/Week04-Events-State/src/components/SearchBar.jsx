// Tuần 4: Controlled Component + Lifting State Up
// SearchBar là controlled component — React kiểm soát hoàn toàn giá trị input
import { useState } from 'react';

function SearchBar({ onSearch }) {
  // State local: giá trị trong ô input
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  // onChange: sync input value với state
  const handleChange = (e) => {
    setKeyword(e.target.value);
    if (error) setError(''); // Clear error khi user bắt đầu gõ
  };

  // onSubmit: validate rồi gọi callback từ parent (lifting state up)
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trang reload

    if (keyword.trim().length < 2) {
      setError('Vui lòng nhập ít nhất 2 ký tự');
      return;
    }

    onSearch(keyword.trim()); // Truyền kết quả lên parent
  };

  const handleClear = () => {
    setKeyword('');
    setError('');
    onSearch(''); // Thông báo parent reset tìm kiếm
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={keyword}          // Controlled: value từ state
          onChange={handleChange}  // onChange: cập nhật state
          placeholder="Tìm sách theo tên, tác giả..."
          style={{
            flex: 1, padding: '10px 14px', border: `1px solid ${error ? '#e74c3c' : '#ddd'}`,
            borderRadius: '6px', fontSize: '14px', outline: 'none'
          }}
        />
        {keyword && (
          <button type="button" onClick={handleClear}
            style={{ padding: '10px 14px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            ✕
          </button>
        )}
        <button type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
          🔍 Tìm
        </button>
      </div>
      {/* Conditional rendering: chỉ hiển thị lỗi khi có */}
      {error && <span style={{ color: '#e74c3c', fontSize: '13px' }}>{error}</span>}
    </form>
  );
}

export default SearchBar;
