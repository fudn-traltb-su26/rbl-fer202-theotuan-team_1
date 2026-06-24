// Tuần 2: Conditional rendering + list rendering
const CATEGORIES = [
  { id: 1, name: 'Kỹ năng sống', icon: '🌱' },
  { id: 2, name: 'Văn học', icon: '📖' },
  { id: 3, name: 'Lịch sử', icon: '🏛️' },
  { id: 4, name: 'Tâm lý học', icon: '🧠' },
  { id: 5, name: 'Lập trình', icon: '💻' },
];

const hasCategories = CATEGORIES.length > 0; // Giả lập trạng thái có/không có dữ liệu

function CategoryList() {
  return (
    <div>
      {/* Conditional rendering với && operator */}
      {!hasCategories && <p style={{ color: '#999' }}>Không có danh mục nào.</p>}

      {/* Conditional rendering với ternary */}
      {hasCategories ? (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '12px 20px',
                cursor: 'pointer',
                textAlign: 'center',
                minWidth: '120px',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '28px' }}>{cat.icon}</div>
              <div style={{ fontSize: '13px', marginTop: '4px' }}>{cat.name}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default CategoryList;
