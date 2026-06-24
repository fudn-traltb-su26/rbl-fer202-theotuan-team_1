// Tuần 3: props.children — Generic wrapper/layout component
// Tái sử dụng ở mọi section mà không cần biết nội dung bên trong

function SectionWrapper({ title, subtitle = '', children, backgroundColor = '#ffffff' }) {
  return (
    <section style={{ backgroundColor, padding: '40px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header của section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{title}</h2>
          {/* Conditional rendering: chỉ hiển thị subtitle nếu có */}
          {subtitle && (
            <p style={{ color: '#666', marginTop: '8px' }}>{subtitle}</p>
          )}
          <hr style={{ borderColor: '#3498db', borderWidth: '2px', width: '60px', margin: '12px 0 0' }} />
        </div>

        {/* props.children: render bất kỳ nội dung nào được truyền vào */}
        {children}
      </div>
    </section>
  );
}

export default SectionWrapper;

// ===== Cách dùng trong App.jsx =====
// <SectionWrapper title="Sách nổi bật" subtitle="Được yêu thích nhất tuần này" backgroundColor="#f8f9fa">
//   <BookGrid books={featuredBooks} onAddToCart={handleAddToCart} />
// </SectionWrapper>
//
// <SectionWrapper title="Danh mục" backgroundColor="#ffffff">
//   <CategoryList categories={categories} />
// </SectionWrapper>
