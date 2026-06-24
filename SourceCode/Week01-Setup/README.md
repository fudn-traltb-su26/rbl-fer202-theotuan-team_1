# TUẦN 1 — KHỞI TẠO PROJECT: ReadMore Bookstore

## 1. Tạo project Vite
```bash
npm create vite@latest readmore-bookstore -- --template react
cd readmore-bookstore
npm install
npm install react-bootstrap bootstrap
npm install react-router-dom axios
```

## 2. Cấu trúc thư mục chuẩn
```
readmore-bookstore/
├── public/
├── src/
│   ├── assets/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context (Global state)
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Page-level components
│   │   └── admin/        # Admin pages
│   ├── services/         # API calls (axios)
│   ├── App.jsx
│   └── main.jsx
├── db.json               # JSON-Server mock database
├── package.json
└── vite.config.js
```

## 3. Mô tả Project
**ReadMore Bookstore** — Nhà sách trực tuyến với các tính năng:
- Xem danh sách sách theo danh mục
- Tìm kiếm sách theo tên / tác giả
- Xem chi tiết sách
- Thêm sách vào giỏ hàng
- Admin quản lý kho sách (CRUD)

## 4. Danh sách Pages (Routes)
| Route | Mô tả |
|-------|-------|
| `/` | Trang chủ: Banner + Sách nổi bật + Danh mục |
| `/books` | Danh sách tất cả sách + tìm kiếm + lọc |
| `/books/:id` | Chi tiết sách |
| `/cart` | Giỏ hàng |
| `/admin/books` | Admin: Quản lý sách (protected) |

## 5. Component Tree (dự kiến)
```
App
├── Header (Navbar + CartIcon)
├── Routes
│   ├── HomePage
│   │   ├── Banner
│   │   ├── CategoryList
│   │   │   └── CategoryCard (x5)
│   │   └── BookGrid
│   │       └── BookCard (x8)
│   ├── BookListPage
│   │   ├── SearchBar
│   │   ├── FilterSidebar
│   │   └── BookGrid → BookCard
│   ├── BookDetailPage
│   │   └── BookDetail
│   ├── CartPage
│   │   └── CartItem (x n)
│   └── AdminBookPage (protected)
│       └── BookForm
└── Footer
```
